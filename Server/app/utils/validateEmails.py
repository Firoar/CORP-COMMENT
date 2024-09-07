from validate_email import validate_email

def validate_email_address(email):
    is_valid = validate_email(email_address=email, check_format=True, check_blacklist=True, check_dns=True)
    return is_valid

