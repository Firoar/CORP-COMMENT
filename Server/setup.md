create main.py

create venv file

```py
python3 -m venv <filename>
```

chage the intrepreter from global to one that is in venv file

view -> commandpallet -> search python intrepreter -> add the path "./venv/bin/python"

now make the terminal use the venv python intrepreter

so whenever i pip intall it will install it for my project rather than global

```sh
source venv/bin/activate

```

now to to verify in ur terminal at the start u will find (venv)
