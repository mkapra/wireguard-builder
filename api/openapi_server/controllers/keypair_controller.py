import subprocess
import sqlite3

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.keypair import Keypair  # noqa: E501
from openapi_server import util


def create_keypair():  # noqa: E501
    """Generate a new keypair

    Generates a new keypair. # noqa: E501


    :rtype: Keypair
    """
    con = sqlite3.connect('/wireguard_builder.db')

    keypair_dict = {
        # Run wg genkey on shell to get private key
        'priv_key': subprocess.check_output('wg genkey', shell=True).decode('utf-8').strip(),
    }
    keypair_dict['pub_key'] = subprocess.check_output(f"echo {keypair_dict['priv_key']} | wg pubkey", shell=True).decode('utf-8').strip()

    keypair = Keypair(**keypair_dict)

    # Insert keypair into database
    cur = con.cursor()
    cur.execute("INSERT INTO keys (priv_key, pub_key) VALUES (?, ?)", (keypair.priv_key, keypair.pub_key))
    con.commit()
    # Get id of keypair
    cur.execute("SELECT id FROM keys WHERE priv_key = ?", (keypair.priv_key,))
    keypair_id = cur.fetchone()[0]
    # Update keypair object with id
    keypair.id = keypair_id

    return keypair


def delete_keypair(keypair_id):  # noqa: E501
    """Deletes a keypair

    Deletes a keypair # noqa: E501

    :param keypair_id: Keypair id
    :type keypair_id: int

    :rtype: None
    """
    # connect to database and delete keypair
    con = sqlite3.connect('/wireguard_builder.db')
    cur = con.cursor()
    cur.execute("DELETE FROM keys WHERE id = ?", (keypair_id,))
    con.commit()

    return None


def get_keypair(keypair_id):  # noqa: E501
    """Get keypair by id

    Get keypair by id # noqa: E501

    :param keypair_id: Keypair id
    :type keypair_id: int

    :rtype: Keypair
    """

    # connect to database and get keypair
    con = sqlite3.connect('/wireguard_builder.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM keys WHERE id = ?", (keypair_id,))
    keypair = cur.fetchone()
    # Check if keypair exists
    if keypair is None:
        return Error(status=404, type="NotFound", message="Keypair not found")
    # Convert keypair to keypair object
    keypair_dict = {
        'id': keypair[0],
        'name': f"keypair-{keypair[0]}",
        'priv_key': keypair[1],
        'pub_key': keypair[2],
    }
    return Keypair(**keypair_dict)


def get_keypairs():  # noqa: E501
    """Get all keypairs

    Retrieves all keypairs. # noqa: E501


    :rtype: List[Keypair]
    """
    # connect to database and get all keypairs
    con = sqlite3.connect('/wireguard_builder.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM keys")
    keypairs = cur.fetchall()
    # Convert keypairs to list of keypair objects
    keypair_list = []
    for keypair in keypairs:
        keypair_dict = {
            'id': keypair[0],
            'name': f"keypair-{keypair[0]}",
            'priv_key': keypair[1],
            'pub_key': keypair[2]
        }
        keypair_list.append(Keypair(**keypair_dict))

    return keypair_list