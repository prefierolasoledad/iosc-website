#!/usr/bin/env bash

# Always update core build tools first
pip install --upgrade pip setuptools wheel

# Now install project dependencies
pip install -r requirements.txt
