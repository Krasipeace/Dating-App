// General
export const STATUS_ERROR = "error";
export const STATUS_SUCCESS = "success";

export const ORDER_BY_DESC = "desc";
export const ORDER_BY_ASC = "asc";
export const ORDER_BY_UPDATED = "updated";

export const USER_ROLE_USER = "MEMBER";
export const USER_ROLE_ADMIN = "ADMIN";

export const INBOX_CONTAINER = "inbox";
export const OUTBOX_CONTAINER = "outbox";

export const SENDER_ID = "senderId";
export const RECIPIENT_ID = "recipientId";
export const SENDER_DELETED = "senderDeleted";
export const RECIPIENT_DELETED = "recipientDeleted";

// Messages
export const SOMETHING_WENT_WRONG = "Something went wrong";
export const USER_ALREADY_EXISTS = "User already exists";
export const USER_NOT_FOUND = "User not found";
export const INVALID_CREDENTIALS = "Invalid credentials";
export const INVALID_TOKEN = "Invalid token";
export const EXPIRED_TOKEN = "Token has expired";
export const MISSING_TOKEN = "Missing token";
export const LOGGED_IN_SUCCESSFULLY = "Logged in successfully";
export const NO_SERVER_RESPONSE = "No server response";

export const VERIFY_EMAIL_BEFORE_SIGNING_IN = "Please verify your email before signing in";
export const SET_MAIN_IMAGE_ERROR = "Only approved by administrator photo can be set as profile avatar";
export const GO_SIGN_IN = "Your new password is ready to use. Go Log in";
export const NO_ROLE_GIVEN = "No role has been given";
export const TRY_REGISTER_AGAIN = "You can try register again with this email address";
export const NO_SUCH_EMAIL = "There is no user with such email";

export const CANNOT_APPROVE_PHOTO = "Cannot approve this photo";
export const MESSAGE_NOT_ABUSE = "Message not abuse";

export const SUCCESS_MESSAGE = "Success";
export const UNATHORIZED_MESSAGE = "Unauthorized";
export const FORBIDDEN_MESSAGE = "Forbidden";

export const MEMBER_NOT_FOUND = "Member not found";

export const ERROR_LOGGING_AUDIT_ACTION = "Error logging audit action: ";

export const NO_USER_ID_FOUND = "Such user id cannot be found";

export const ACTION_LOG_SUCCESS = "Admin action logged successfully";
export const ACTION_LOG_FAILED = "Failed to perform admin action: ";
export const ADMIN_APPROVE_PHOTO = "Admin approved photo with publicId: ";
export const ADMIN_REJECT_PHOTO = "Admin rejected photo with publicId: ";
export const ADMIN_DECLINE_MESSAGE = "Admin marked the reported message as not abusive";
export const ADMIN_APPROVE_MESSAGE = "Admin deleted the reported message";
export const ADMIN_DELETED_MEMBER = "Admin deleted the member with id: ";
export const ADMIN_UPDATED_MEMBER = "Admin updated the member with id: ";

// Pusher
export const ROUTE_NEW_MESSAGE = "message:new";
export const ROUTE_READ_MESSAGES = "message:read";
export const ROUTE_PRIVATE_PREFIX = "private-";
export const ROUTE_LIKE_NEW = "like:new";

// GETMEMBERS_SETTINGS
export const AGE_RANGE = "18,100";
export const GENDERS = "male,female";
export const START_PAGE_NUMBER = "1";
export const PAGE_SIZE = "12";
export const BOOLEAN_TRUE = "true";
export const BOOLEAN_FALSE = "false";

// FETCHLIKEDMEMBERS_SETTINGS
export const CASE_TYPE_SOURCE = "source";
export const CASE_TYPE_TARGET = "target";
export const CASE_TYPE_MUTUAL = "mutual";