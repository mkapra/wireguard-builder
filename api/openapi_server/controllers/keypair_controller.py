import connexion
import six
import os

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.keypair import Keypair  # noqa: E501
from openapi_server import util

def create_keypair():  # noqa: E501
    """Generate a new keypair

    Generates a new keypair. # noqa: E501


    :rtype: Keypair
    """
    keypair = {
        id: 2,
        name: 'asdf_key',
        priv_key: os.sytem('wg genkey')
    }
    keypair['pub_key'] = os.system(f"echo {keypair['priv_key']} | wg pubkey")

    return Keypair.from_dict(keypair)


def delete_keypair(keypair_id):  # noqa: E501
    """Deletes a keypair

    Deletes a keypair # noqa: E501

    :param keypair_id: Keypair id
    :type keypair_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_keypair(keypair_id):  # noqa: E501
    """Get keypair by id

    Get keypair by id # noqa: E501

    :param keypair_id: Keypair id
    :type keypair_id: int

    :rtype: Keypair
    """
    return 'do some magic!'


def get_keypairs():  # noqa: E501
    """Get all keypairs

    Retrieves all keypairs. # noqa: E501


    :rtype: List[Keypair]
    """
    return 'do some magic!'
