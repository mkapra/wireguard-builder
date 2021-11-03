use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;

use crate::models::Key;
use crate::schema::keys::dsl::*;

#[post("/keys")]
pub async fn post_key(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
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
pub async fn get_keys(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = keys
        .load::<Key>(&data.db_connection)
        .expect("Could not get keys");
    let json_keys = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_keys)
}

#[get("/keys/{id}")]
pub async fn get_key(
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
