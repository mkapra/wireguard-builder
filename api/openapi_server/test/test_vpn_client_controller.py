# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.client import Client  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server.test import BaseTestCase


class TestVPNClientController(BaseTestCase):
    """VPNClientController integration test stubs"""

    def test_create_client(self):
        """Test case for create_client

        Add a new VPN client
        """
        client = {
  "keepalive" : 2170,
  "allowedIps" : [ {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  } ],
  "name" : "name",
  "keypair" : {
    "privKey" : "privKey",
    "name" : "name",
    "id" : 1280358508,
    "pubKey" : "pubKey"
  },
  "vpnIp" : {
    "vpnNet" : {
      "address" : "address",
      "port" : 60957,
      "name" : "name",
      "id" : 1210617418,
      "interface" : 353,
      "subnetmask" : 8
    },
    "address" : "address"
  },
  "description" : "description",
  "id" : 171976544,
  "dnsServer" : {
    "name" : "name",
    "ipAddress" : "ipAddress",
    "id" : 314780940
  }
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/client',
            method='POST',
            headers=headers,
            data=json.dumps(client),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_client(self):
        """Test case for delete_client

        Deletes a VPN client
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/client/{client_id}'.format(client_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_clients(self):
        """Test case for get_clients

        Get all vpn clients
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/client',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_vpn_client(self):
        """Test case for get_vpn_client

        Find VPN client by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/client/{client_id}'.format(client_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_client(self):
        """Test case for update_client

        Update a VPN client
        """
        client = {
  "keepalive" : 2170,
  "allowedIps" : [ {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  }, {
    "ipAddress" : "ipAddress",
    "description" : "description"
  } ],
  "name" : "name",
  "keypair" : {
    "privKey" : "privKey",
    "name" : "name",
    "id" : 1280358508,
    "pubKey" : "pubKey"
  },
  "vpnIp" : {
    "vpnNet" : {
      "address" : "address",
      "port" : 60957,
      "name" : "name",
      "id" : 1210617418,
      "interface" : 353,
      "subnetmask" : 8
    },
    "address" : "address"
  },
  "description" : "description",
  "id" : 171976544,
  "dnsServer" : {
    "name" : "name",
    "ipAddress" : "ipAddress",
    "id" : 314780940
  }
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/client/{client_id}'.format(client_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(client),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
