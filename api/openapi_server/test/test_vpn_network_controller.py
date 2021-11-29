# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server.test import BaseTestCase


class TestVPNNetworkController(BaseTestCase):
    """VPNNetworkController integration test stubs"""

    def test_create_vpn_network(self):
        """Test case for create_vpn_network

        Add a new VPN Network
        """
        vpn_net = {
  "address" : "address",
  "port" : 60957,
  "name" : "name",
  "id" : 1210617418,
  "interface" : 353,
  "subnetmask" : 8
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_net',
            method='POST',
            headers=headers,
            data=json.dumps(vpn_net),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_vpn_network(self):
        """Test case for delete_vpn_network

        Deletes a vpn network
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_net/{vpn_net_id}'.format(vpn_net_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_vpn_network(self):
        """Test case for get_vpn_network

        Find vpn network by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_net/{vpn_net_id}'.format(vpn_net_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_vpn_networks(self):
        """Test case for get_vpn_networks

        Get all vpn networks
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_net',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_vpn_network(self):
        """Test case for update_vpn_network

        Update a vpn network
        """
        vpn_net = {
  "address" : "address",
  "port" : 60957,
  "name" : "name",
  "id" : 1210617418,
  "interface" : 353,
  "subnetmask" : 8
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_net/{vpn_net_id}'.format(vpn_net_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(vpn_net),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
