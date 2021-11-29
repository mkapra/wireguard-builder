import connexion
import six

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.server import Server  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server.models.wireguard_config import WireguardConfig  # noqa: E501
from openapi_server import util


def create_server(server):  # noqa: E501
    """Add a new VPN server

    Add a new VPN server # noqa: E501

    :param server: Create a new VPN server
    :type server: dict | bytes

    :rtype: Server
    """
    if connexion.request.is_json:
        server = Server.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_server(server_id):  # noqa: E501
    """Deletes a VPN server

    Deletes a VPN server # noqa: E501

    :param server_id: VPN server id
    :type server_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_server():  # noqa: E501
    """Get all vpn servers

    Get all vpn servers # noqa: E501


    :rtype: List[Server]
    """
    return 'do some magic!'


def get_vpn_server(server_id):  # noqa: E501
    """Find VPN server by id

    Returns a single VPN server # noqa: E501

    :param server_id: VPN server id
    :type server_id: int

    :rtype: Server
    """
    return 'do some magic!'


def update_server(server_id, server):  # noqa: E501
    """Update a VPN server

    Update a VPN server # noqa: E501

    :param server_id: VPN server id
    :type server_id: int
    :param server: Update a VPN server
    :type server: dict | bytes

    :rtype: Server
    """
    if connexion.request.is_json:
        server = Server.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
