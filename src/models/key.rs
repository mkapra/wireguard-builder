use wireguard_control;
use serde::Serialize;
use crate::schema::keys;

#[derive(Debug, Queryable, Serialize)]
pub struct Key {
    pub id: i32,
    pub priv_key: String,
    pub pub_key: String,
}

impl Key {
    pub fn gen_key() -> NewKey {
        let key = wireguard_control::KeyPair::generate();

        NewKey {
            priv_key: key.private.to_base64(),
            pub_key: key.public.to_base64(),
        }
    }
}

#[derive(Insertable, Serialize)]
#[table_name = "keys"]
pub struct NewKey {
    pub priv_key: String,
    pub pub_key: String,
}
