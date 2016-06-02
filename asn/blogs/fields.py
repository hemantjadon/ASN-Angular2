from django.db.models import CharField
import os
import uuid
import base64

def KEY():
	'''
		URL safe UUID
	'''
	
	orig_UUID = uuid.uuid5(uuid.uuid4(),os.environ.get('DJANGO_SECRET'))
	b64key_bytes = base64.b64encode(orig_UUID.bytes)
	b64key_string = b64key_bytes.decode('utf-8')
	key = b64key_string.rstrip('=\n').replace('/','_')
	return key
	
class CustomUUIDField(CharField) :
    """
    	UUIDField stored in 22 Chars
    	Example: uuid = UUIDField(editable=False)
    """     
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = kwargs.get('max_length', 22 )
        # kwargs['blank'] = True
        kwargs['default'] = KEY()
        CharField.__init__(self, *args, **kwargs)