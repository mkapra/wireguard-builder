# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.server import Server  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server.models.wireguard_config import WireguardConfig  # noqa: E501
from openapi_server.test import BaseTestCase


class TestVPNServerController(BaseTestCase):
    """VPNServerController integration test stubs"""

    def test_create_server(self):
        """Test case for create_server

        Add a new VPN server
        """
        server = {
  "vpnNet" : {
    "address" : "address",
    "port" : 60957,
    "name" : "name",
    "id" : 1210617418,
    "interface" : 353,
    "subnetmask" : 8
  },
  "name" : "name",
  "forwardInterface" : "forwardInterface",
  "keypair" : {
    "privKey" : "privKey",
    "name" : "name",
    "id" : 1280358508,
    "pubKey" : "pubKey"
  },
  "description" : "description",
  "id" : 171976544
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/server',
            method='POST',
            headers=headers,
            data=json.dumps(server),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_server(self):
        """Test case for delete_server

        Deletes a VPN server
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/server/{server_id}'.format(server_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_server(self):
        """Test case for get_server

        Get all vpn servers
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/server',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_vpn_server(self):
        """Test case for get_vpn_server

        Find VPN server by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/server/{server_id}'.format(server_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_server(self):
        """Test case for update_server

        Update a VPN server
        """
        server = {
  "vpnNet" : {
    "address" : "address",
    "port" : 60957,
    "name" : "name",
    "id" : 1210617418,
    "interface" : 353,
    "subnetmask" : 8
  },
  "name" : "name",
  "forwardInterface" : "forwardInterface",
  "keypair" : {
    "privKey" : "privKey",
    "name" : "name",
    "id" : 1280358508,
    "pubKey" : "pubKey"
  },
  "description" : "description",
  "id" : 171976544
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/server/{server_id}'.format(server_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(server),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
