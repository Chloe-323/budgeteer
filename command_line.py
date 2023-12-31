import requests

def interpret(args):
    pass

while True:
    print("> ")
    userInput = input()

    if userInput == "q" or userInput == "quit":
        break

    if userInput == "?":
        print("l(ogin) <username> <password>")
        print("r(egister) <username> <password>")
        print("c(reate) <sessionId> <budgetName> <startDate> <endDate>")
        print("l(ist) <sessionId>")
        print("v(iew) <sessionId> <budgetId>")
        print("(categor)y <sessionId> <budgetId>")
        print("a(dd Tx) <sessionId> <categoryId> <txName> <amount>")

    args = userInput.split()

    interpret(args)