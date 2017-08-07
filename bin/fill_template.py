#!/usr/bin/env python3

import sys
import re

GENERIC_SLOT_MATCHER = re.compile(r'\{\{\s*(\w+)\s*\}\}')

class UndefinedSlot(Exception):
    pass

def fill_template(template, variables):
    found_slots = GENERIC_SLOT_MATCHER.findall(template)
    matchers = {
        slot_name: re.compile(r'\{\{\s*(' + slot_name + ')\s*\}\}')
        for slot_name in found_slots
    }
    for slot_name in matchers:
        try:
            template = matchers[slot_name].sub(variables[slot_name], template)
        except KeyError as e:
            raise UndefinedSlot(slot_name)

    return template


if __name__ == '__main__':
    template_path = sys.argv[1]
    variables = dict([v.split('=') for v in sys.argv[2:]])
    
    print(fill_template(open(template_path).read(), variables))
