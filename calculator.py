x = int(raw_input("Enter the value of x: "))
y = int(raw_input("Enter the value of y: "))

operation = raw_input("Enter the operation you want to do: ")

if operation == "+":
    print x + y
elif operation == "-":
    print x - y
elif operation == "*":
    print x * y
elif operation == "/":
    print x / y
else:
    print "operation isn't correct"


