# Getting started

### Setup a python virtual env

```
> cd /backend
> python3 -m venv venv
> source venv/bin/activate
```

### Install requirements

```
> pip install -r requirements.txt
```

### Initialise db with csv data

```
> python load_data.py
```

### Start server

```
> fastapi dev main.py
```
