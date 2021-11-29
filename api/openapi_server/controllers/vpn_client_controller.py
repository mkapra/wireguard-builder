import connexion
import six

from openapi_server.models.client import Client  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server import util


def create_client(client):  # noqa: E501
    """Add a new VPN client

    Add a new VPN client # noqa: E501

    :param client: Create a new VPN client
    :type client: dict | bytes

    :rtype: Client
    """
    if connexion.request.is_json:
        client = Client.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_client(client_id):  # noqa: E501
    """Deletes a VPN client

    Deletes a VPN client # noqa: E501

    :param client_id: VPN client id
    :type client_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_clients():  # noqa: E501
    """Get all vpn clients

    Get all vpn clients # noqa: E501


    :rtype: List[Client]
    """
    return 'do some magic!'


def get_vpn_client(client_id):  # noqa: E501
    """Find VPN client by id

    Returns a single VPN client # noqa: E501

    :param client_id: VPN client id
    :type client_id: int

    :rtype: Client
    """
    return 'do some magic!'


def update_client(client_id, client):  # noqa: E501
    """Update a VPN client

    Update a VPN client # noqa: E501

    :param client_id: VPN client id
    :type client_id: int
    :param client: Update a VPN client
    :type client: dict | bytes

    :rtype: Client
    """
    if connexion.request.is_json:
        client = Client.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
