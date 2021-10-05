use crate::schema::allowed_ips;
use serde::Serialize;

#[derive(Debug, Queryable, Serialize)]
pub struct AllowedIp {
    pub id: i32,
    pub ip: String,
    pub description: Option<String>,
}

#[derive(Insertable, Serialize)]
#[table_name = "allowed_ips"]
pub struct NewAllowedIp {
    pub ip: String,
    pub description: Option<String>,
}
