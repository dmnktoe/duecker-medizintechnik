import os
import re
import requests
from bs4 import BeautifulSoup

# Regex to match external URLs
url_regex = re.compile(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+')

# Walk through all .tsx files in the repository
for root, dirs, files in os.walk("."):
  for file in files:
    if file.endswith(".tsx"):
      with open(os.path.join(root, file), 'r') as f:
        content = f.read()
        urls = url_regex.findall(content)
        for url in urls:
          try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
          except (requests.HTTPError, requests.ConnectionError):
            print(f"Broken link: {url} in file: {file}")