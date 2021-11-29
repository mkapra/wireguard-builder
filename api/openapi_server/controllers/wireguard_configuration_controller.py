import connexion
import six

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server.models.wireguard_config import WireguardConfig  # noqa: E501
from openapi_server import util


def get_config_for_client(client_id_config):  # noqa: E501
    """Returns a configuration for a VPN client

    Returns a configuration for a VPN client # noqa: E501

    :param client_id_config: client id for the configuration request
    :type client_id_config: int

    :rtype: WireguardConfig
    """
    return 'do some magic!'


def get_config_for_server(server_id_config):  # noqa: E501
    """Returns a configuration for a VPN server

    Returns a configuration for a VPN server # noqa: E501

    :param server_id_config: server id for the configuration request
    :type server_id_config: int

    :rtype: WireguardConfig
    """
    return 'do some magic!'
