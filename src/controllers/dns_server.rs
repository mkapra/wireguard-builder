use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;

use crate::models::DnsServer;
use crate::models::NewDnsServer;
use crate::schema::dns_servers::dsl::*;

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
