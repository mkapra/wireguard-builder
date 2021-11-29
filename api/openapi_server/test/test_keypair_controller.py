# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.keypair import Keypair  # noqa: E501
from openapi_server.test import BaseTestCase


class TestKeypairController(BaseTestCase):
    """KeypairController integration test stubs"""

    def test_create_keypair(self):
        """Test case for create_keypair

        Generate a new keypair
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/keypair',
            method='POST',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_keypair(self):
        """Test case for delete_keypair

        Deletes a keypair
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/keypair/{keypair_id}'.format(keypair_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_keypair(self):
        """Test case for get_keypair

        Get keypair by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/keypair/{keypair_id}'.format(keypair_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_keypairs(self):
        """Test case for get_keypairs

        Get all keypairs
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/keypair',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
