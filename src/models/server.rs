use serde::{Deserialize, Serialize};

use crate::models::{Key, VpnNet};
use crate::schema::servers;

#[derive(Identifiable, Debug, Queryable, Serialize, Associations)]
#[belongs_to(VpnNet)]
#[belongs_to(Key)]
#[table_name = "servers"]
pub struct Server {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub forward_interface: Option<String>,
    pub vpn_net_id: i32,
    pub key_id: i32,
}

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[table_name = "servers"]
pub struct NewServer {
    pub name: String,
    pub description: Option<String>,
    pub forward_interface: Option<String>,
    pub vpn_net_id: i32,
    pub key_id: i32,
}
