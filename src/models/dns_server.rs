use crate::schema::dns_servers;
use serde::Serialize;

#[derive(Debug, Queryable, Serialize)]
pub struct DnsServer {
    pub id: i32,
    pub ip: String,
}

#[derive(Insertable, Serialize)]
#[table_name = "dns_servers"]
pub struct NewDnsServer {
    pub ip: String,
}
