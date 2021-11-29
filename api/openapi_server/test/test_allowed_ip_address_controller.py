# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.allowed_ip import AllowedIp  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server.test import BaseTestCase


class TestAllowedIPAddressController(BaseTestCase):
    """AllowedIPAddressController integration test stubs"""

    def test_create_allowed_ip(self):
        """Test case for create_allowed_ip

        Add a new AllowedIP
        """
        allowed_ip = {
  "ipAddress" : "ipAddress",
  "description" : "description"
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/allowed_ip',
            method='POST',
            headers=headers,
            data=json.dumps(allowed_ip),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_allowed_ip(self):
        """Test case for delete_allowed_ip

        Deletes a AllowedIp
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/allowed_ip/{allowed_ip_id}'.format(allowed_ip_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_allowed_ip(self):
        """Test case for get_allowed_ip

        Find AlllowedIp by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/allowed_ip/{allowed_ip_id}'.format(allowed_ip_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_allowed_ips(self):
        """Test case for get_allowed_ips

        Get all AllowedIps
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/allowed_ip',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_allowed_ip(self):
        """Test case for update_allowed_ip

        Update a AllowedIP
        """
        allowed_ip = {
  "ipAddress" : "ipAddress",
  "description" : "description"
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/allowed_ip/{allowed_ip_id}'.format(allowed_ip_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(allowed_ip),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
