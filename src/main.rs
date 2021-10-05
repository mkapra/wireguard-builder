use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use diesel::prelude::*;

#[macro_use]
extern crate diesel;

mod models;
use models::Key;

mod schema;
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

    let json_key = serde_json::to_string(&created_key)
        .expect("Could not convert");

    HttpResponse::Ok().body(json_key)
}

#[get("/keys")]
async fn get_key(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = keys
        .load::<Key>(&data.db_connection)
        .expect("Could not get keys");
    let json_keys = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_keys)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .data(wireguard_api_rs::AppState {
                db_connection: wireguard_api_rs::establish_connection(),
            })
            .service(post_key)
            .service(get_key)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
