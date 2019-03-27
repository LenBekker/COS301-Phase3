# COS301-Phase3

Functional Requirements

R 23 The CIS will provide a web human interface for easy CRUD of all the
client information in the CIS database.

R 24 The CIS will provide an internal service to create a client. This service
may be used by the CIS web interface and the service of R 25.
  * R 24.1 Assign a clientID
  * R 24.2 Notify all relevant subsystems to add the client.

R 25 The CIS will provide an internal service to upload new clients using a
csv ﬁle. This service should optionally use (i.e. the user can choose) the
service described in R 24.

R 26 The CIS will provide a service to query the database, given the userID
return the e-mail address of the client.

R 27 The CIS will provide a service to suspend (de-activate) a client identiﬁed
with his/her clientID. This service should be used by the CIS web interface
as well as being available to external subsystems such as AUTH.
  * R 27.1 Mark the user as in-active
  * R 27.2 Notify all relevant subsystems to de-activate the client.

R 28 The CIS will provide a service to re-activate a suspended client identiﬁed
with his/her clientID. This service should be used by the CIS web interface
only.
  * R 28.1 Mark the user as active
  * R 28.2 Notify all relevant subsystems to re-activate the client.

R 29 The CIS will log all its events in a log ﬁle and push the ﬁle to the Re-
porting subsystem (Section 9.9) using a service provided by the reporting
subsystem. This log will contain system events (such as a request made
by another subsystem) and database transactions.
