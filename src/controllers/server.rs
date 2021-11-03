use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;

use crate::models::NewServer;
use crate::models::Server;
use crate::schema::servers::dsl::*;

#[get("/servers")]
async fn get_servers(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = servers
        .load::<Server>(&data.db_connection)
        .expect("Could not get dns_servers");
    let json_servers = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_servers)
}

#[get("/servers/{id}")]
async fn get_server(
    data: web::Data<wireguard_api_rs::AppState>,
    web::Path((server_id,)): web::Path<(i32,)>,
) -> impl Responder {
    let result = servers
        .find(server_id)
        .get_result::<Server>(&data.db_connection)
        .expect("Could not get servers");
    let json_server = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}

#[post("/servers")]
async fn post_servers(
    server: web::Json<NewServer>,
    data: web::Data<wireguard_api_rs::AppState>,
) -> impl Responder {
    if let Ok(_) = servers
        .filter(name.eq(&server.name))
        .get_result::<Server>(&data.db_connection)
    {
        return HttpResponse::BadRequest().body(r#"{"error": "Server exists already."}"#);
    }

    let server_converted = server.into_inner();
    diesel::insert_into(servers)
        .values(&server_converted)
        .execute(&data.db_connection)
        .expect("Error saving new server");

    let created_server = servers
        .filter(name.eq(&server_converted.name))
        .get_result::<Server>(&data.db_connection)
        .unwrap();

    let json_server = serde_json::to_string(&created_server).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}
