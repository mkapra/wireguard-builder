import connexion
import six

from openapi_server.models.dns_server import DnsServer  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server import util


def create_dns_server(dns_server):  # noqa: E501
    """Add a new DNS server

    Add a new DNS server # noqa: E501

    :param dns_server: Create a new DNS server
    :type dns_server: dict | bytes

    :rtype: DnsServer
    """
    if connexion.request.is_json:
        dns_server = DnsServer.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_dns_server(server_id):  # noqa: E501
    """Deletes a DNS server

    Deletes a DNS server # noqa: E501

    :param server_id: DNS server id
    :type server_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_dns_server(server_id):  # noqa: E501
    """Find DNS server by id

    Returns a single DNS server # noqa: E501

    :param server_id: DNS server id
    :type server_id: int

    :rtype: DnsServer
    """
    return 'do some magic!'


def get_dns_servers():  # noqa: E501
    """Get all dns servers

    Get all dns servers # noqa: E501


    :rtype: List[DnsServer]
    """
    return 'do some magic!'


def update_dns_server(server_id, dns_server):  # noqa: E501
    """Update a DNS server

    Update a DNS server # noqa: E501

    :param server_id: DNS server id
    :type server_id: int
    :param dns_server: Update a DNS server
    :type dns_server: dict | bytes

    :rtype: DnsServer
    """
    if connexion.request.is_json:
        dns_server = DnsServer.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
