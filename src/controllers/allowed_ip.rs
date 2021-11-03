use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;

use crate::models::AllowedIp;
use crate::models::NewAllowedIp;
use crate::schema::allowed_ips::dsl::*;

#[get("/allowed_ips")]
async fn get_allowed_ips(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = allowed_ips
        .load::<AllowedIp>(&data.db_connection)
        .expect("Could not get allowed_ips");
    let json_servers = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_servers)
}

#[get("/allowed_ips/{id}")]
async fn get_allowed_ip(
    data: web::Data<wireguard_api_rs::AppState>,
    web::Path((ip_id,)): web::Path<(i32,)>,
) -> impl Responder {
    let result = allowed_ips
        .find(ip_id)
        .get_result::<AllowedIp>(&data.db_connection)
        .expect("Could not get allowed_ip");
    let json_allowed_ip = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_allowed_ip)
}

#[post("/allowed_ips")]
async fn post_allowed_ips(
    allowed_ip: web::Json<NewAllowedIp>,
    data: web::Data<wireguard_api_rs::AppState>,
) -> impl Responder {
    if let Ok(_) = allowed_ips
        .filter(ip.eq(&allowed_ip.ip))
        .get_result::<AllowedIp>(&data.db_connection)
    {
        return HttpResponse::BadRequest().body(r#"{"error": "VPN-Net exists already."}"#);
    }

    let allowed_ips_converted = allowed_ip.into_inner();
    diesel::insert_into(allowed_ips)
        .values(&allowed_ips_converted)
        .execute(&data.db_connection)
        .expect("Error saving new post");

    let created_vpn_net = allowed_ips
        .filter(ip.eq(&allowed_ips_converted.ip))
        .get_result::<AllowedIp>(&data.db_connection)
        .unwrap();

    let json_server = serde_json::to_string(&created_vpn_net).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}
