import connexion
import sqlite3

from openapi_server.models.dns_server import DnsServer  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server import util


def create_dns_server():  # noqa: E501
    """Add a new DNS server

    Add a new DNS server # noqa: E501

    :param dns_server: Create a new DNS server
    :type dns_server: dict | bytes

    :rtype: DnsServer
    """
    if connexion.request.is_json:
        dns_server = DnsServer.from_dict(connexion.request.get_json())  # noqa: E501
        # connect to database and insert dns_server
        con = sqlite3.connect('/wireguard_builder.db')
        cur = con.cursor()
        cur.execute("INSERT INTO dns_servers (ip) VALUES (?)", [dns_server.ip_address])
        con.commit()
        # get dns_server id
        cur.execute("SELECT id FROM dns_servers WHERE ip = ?", [dns_server.ip_address])
        dns_server_id = cur.fetchone()[0]
        dns_server.id = dns_server_id

        return dns_server

    # return error if request is not json
    return Error(code=400, message="Request must be in JSON format")

def delete_dns_server(server_id):  # noqa: E501
    """Deletes a DNS server

    Deletes a DNS server # noqa: E501

    :param server_id: DNS server id
    :type server_id: int

    :rtype: None
    """
    # connect to database and delete dns_server
    con = sqlite3.connect('/wireguard_builder.db')
    cur = con.cursor()
    cur.execute("DELETE FROM dns_servers WHERE id = ?", [server_id])
    con.commit()
    con.close()

    return None


def get_dns_server(server_id):  # noqa: E501
    """Find DNS server by id

    Returns a single DNS server # noqa: E501

    :param server_id: DNS server id
    :type server_id: int

    :rtype: DnsServer
    """
    # connect to database and get dns_server
    con = sqlite3.connect('/wireguard_builder.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM dns_servers WHERE id = ?", [server_id])
    dns_server = cur.fetchone()
    con.close()
    # return dns_server
    return DnsServer(id=dns_server[0], ip_address=dns_server[1])


def get_dns_servers():  # noqa: E501
    """Get all dns servers

    Get all dns servers # noqa: E501


    :rtype: List[DnsServer]
    """
    # connect to database and get dns_servers
    con = sqlite3.connect('/wireguard_builder.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM dns_servers")
    dns_servers = cur.fetchall()
    con.close()
    # return dns_servers
    return [DnsServer(id=dns_server[0], ip_address=dns_server[1]) for dns_server in dns_servers]


def update_dns_server(server_id):  # noqa: E501
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
        # connect to database and update dns_server
        con = sqlite3.connect('/wireguard_builder.db')
        cur = con.cursor()
        cur.execute("UPDATE dns_servers SET ip = ? WHERE id = ?", [dns_server.ip_address, server_id])
        con.commit()
        # get dns_server id
        cur.execute("SELECT id FROM dns_servers WHERE ip = ?", [dns_server.ip_address])

        return dns_server

    # return error if request is not json
    return Error(code=400, message="Request must be in JSON format")
