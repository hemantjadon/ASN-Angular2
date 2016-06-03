import os
import uuid
import base64

def UUIDKeyGenerator():
	'''
		URL safe UUID.
		UUID encoded in base64, then decoded in utf-8 and with '/' replaced by '_'.
	'''
	
	orig_UUID = uuid.uuid5(uuid.uuid4(),os.environ.get('DJANGO_SECRET'))
	b64key_bytes = base64.b64encode(orig_UUID.bytes)
	b64key_string = b64key_bytes.decode('utf-8')
	key = b64key_string.rstrip('=\n').replace('/','_')
	return key