# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.dns_server import DnsServer  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server.test import BaseTestCase


class TestDNSServerController(BaseTestCase):
    """DNSServerController integration test stubs"""

    def test_create_dns_server(self):
        """Test case for create_dns_server

        Add a new DNS server
        """
        dns_server = {
  "name" : "name",
  "ipAddress" : "ipAddress",
  "id" : 314780940
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/dns_server',
            method='POST',
            headers=headers,
            data=json.dumps(dns_server),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_dns_server(self):
        """Test case for delete_dns_server

        Deletes a DNS server
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/dns_server/{server_id}'.format(server_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_dns_server(self):
        """Test case for get_dns_server

        Find DNS server by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/dns_server/{server_id}'.format(server_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_dns_servers(self):
        """Test case for get_dns_servers

        Get all dns servers
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/dns_server',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_dns_server(self):
        """Test case for update_dns_server

        Update a DNS server
        """
        dns_server = {
  "name" : "name",
  "ipAddress" : "ipAddress",
  "id" : 314780940
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/dns_server/{server_id}'.format(server_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(dns_server),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
