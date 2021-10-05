use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use diesel::prelude::*;

#[macro_use]
extern crate diesel;

mod models;
use models::DnsServer;
use models::Key;
use models::NewDnsServer;

mod schema;
use schema::dns_servers::dsl::*;
use schema::keys::dsl::*;

#[post("/keys")]
async fn post_key(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let key = Key::gen_key();

    diesel::insert_into(keys)
        .values(&key)
        .execute(&data.db_connection)
        .expect("Error saving new post");

    let created_key = keys
        .filter(priv_key.eq(key.priv_key))
        .get_result::<Key>(&data.db_connection)
        .unwrap();

    let json_key = serde_json::to_string(&created_key).expect("Could not convert");

    HttpResponse::Ok().body(json_key)
}

#[get("/keys")]
async fn get_keys(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = keys
        .load::<Key>(&data.db_connection)
        .expect("Could not get keys");
    let json_keys = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_keys)
}

#[get("/keys/{id}")]
async fn get_key(
    data: web::Data<wireguard_api_rs::AppState>,
    web::Path((key_id,)): web::Path<(i32,)>,
) -> impl Responder {
    let result = keys
        .find(key_id)
        .get_result::<Key>(&data.db_connection)
        .expect("Could not get key");
    let json_key = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_key)
}

#[get("/dns_servers")]
async fn get_dns_servers(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = dns_servers
        .load::<DnsServer>(&data.db_connection)
        .expect("Could not get dns_servers");
    let json_servers = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_servers)
}

#[get("/dns_servers/{id}")]
async fn get_dns_server(
    data: web::Data<wireguard_api_rs::AppState>,
    web::Path((server_id,)): web::Path<(i32,)>,
) -> impl Responder {
    let result = dns_servers
        .find(server_id)
        .get_result::<DnsServer>(&data.db_connection)
        .expect("Could not get dns_servers");
    let json_server = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}

#[post("/dns_servers")]
async fn post_dns_servers(
    dns_server: web::Json<NewDnsServer>,
    data: web::Data<wireguard_api_rs::AppState>,
) -> impl Responder {
    if let Ok(_) = dns_servers
        .filter(ip.eq(&dns_server.ip))
        .get_result::<DnsServer>(&data.db_connection)
    {
        return HttpResponse::BadRequest().body(r#"{"error": "DNS-Server exists already."}"#);
    }

    let dns_server_converted = dns_server.into_inner();
    diesel::insert_into(dns_servers)
        .values(&dns_server_converted)
        .execute(&data.db_connection)
        .expect("Error saving new post");

    let created_dns_server = dns_servers
        .filter(ip.eq(dns_server_converted.ip))
        .get_result::<DnsServer>(&data.db_connection)
        .unwrap();

    let json_server = serde_json::to_string(&created_dns_server).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .data(wireguard_api_rs::AppState {
                db_connection: wireguard_api_rs::establish_connection(),
            })
            .service(get_keys)
            .service(get_key)
            .service(post_key)
            .service(get_dns_servers)
            .service(get_dns_server)
            .service(post_dns_servers)
    })
    .bind("127.0.0.1:8180")?
    .run()
    .await
}
