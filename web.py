import requests
from bs4 import BeautifulSoup



major = []

#key will be major and the values will be classes
core_class = {}
preq = {}

major = [ {
    "name": "Computer Science: Computer Game Design B.S.",
    "requirements": [],
    "prerequisites": {}
    },
]








classes = {}
preq = {}

coursename= []


def get_course_prerequisites(course_url, preq):
    response = requests.get(course_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        requirements_section = soup.find('h4')
        tmp = requirements_section.findNextSibling('p')
        
        prerequisites_array = (tmp.text[17:])
        prerequisites = prerequisites_array.split(" or ")
        return prerequisites
    else:
        print('Failed to retrieve the webpage.')
    return "No prerequisites found or failed to fetch."


# course_details_url = 'https://catalog.ucsc.edu/en/current/general-catalog/courses/math-mathematics/lower-division/math-21/'
# prerequisites = get_course_prerequisites(course_details_url)
# print(prerequisites)
# URL of the webpage you want to scrape
url = 'https://catalog.ucsc.edu/current/general-catalog/academic-units/baskin-engineering/computational-media/computer-science-computer-game-design-bs/'
future =  []
# Send a GET request to the webpage
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract the h1 element
    h1_element = soup.find('h1')
    if h1_element:
        print('H1 Element:', h1_element.text)
        major[0]["name"] = h1_element.text
    else:
        print('No H1 element found.')

    # Extract elements with class 'sc-coursenumber'
    coursenumbers = soup.find_all(class_='sc-coursenumber')
    for number in coursenumbers:
        print('Course Number:', number.text)

    # print(coursenumbers)
    
    # Extract elements with class 'sc-courselink'
    courselinks = soup.find_all(class_='sc-courselink')
    for link in courselinks:
        if (link.text != " One of these courses" and  link.text != " Either these courses" and link.text != " or these courses" and not link.text.startswith(" or") and not link.text.startswith(" One") and not link.text.startswith(" Either")):
            major[0]["requirements"].append(link.text)
        print('Course Link:', link['href'])
        link['href'] = 'https://catalog.ucsc.edu' + link['href']
        future.append((link.text, link['href']))

else:
    print('Failed to retrieve the webpage.')
# print(future)

i = future[0]
# print(i[0])
# print(i[1])
preq[i[0]] = get_course_prerequisites(i[1], preq)

for i in future:
    print(i[0])
    if i[0] not in preq and i[0] != " One of these courses" and  i[0] != " Either these courses" and i[0] != " or these courses" and not i[0].startswith(" or") and not i[0].startswith(" One") and not i[0].startswith(" Either"):
        preq[i[0]] = get_course_prerequisites(i[1], preq)
        major[0]["prerequisites"].append(preq[i[0]])
    # print(i[0])
    # print(i[1])
    # print(preq[i[0]])

print(major[0]["prerequisites"])

# Replace 'YOUR_WEBPAGE_URL' with the actual URL of the webpage you want to scrape.

