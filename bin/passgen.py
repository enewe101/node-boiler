#!/usr/bin/env python

import re
import os
import sys
import string

CHARS = string.ascii_letters + string.digits + '_-'
DEFAULT_LENGTH = 16


def get_password(length):
    # Get length number of random characters from
    return ''.join([
        CHARS[ord(os.urandom(1)) % len(CHARS)] 
        for c in range(length)
    ])


def sub_in_passwords(template, length, slot_name='secret'):

    # Compile the slot_matcher pattern as a pattern
    slot_matcher = re.compile(slot_name)

    # Figure out how many occurrences there are
    num_occurrences = len(slot_matcher.findall(template))

    # Sub each occurrence with a randomly generated password
    template = slot_matcher.sub(lambda x: get_password(length), template)

    return template


if __name__ == '__main__':
    input_path = sys.argv[1]
    try:
        length = int(sys.argv[2])
    except IndexError:
        length = DEFAULT_LENGTH

    print sub_in_passwords(open(input_path).read(), length)
