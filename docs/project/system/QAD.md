<div style="text-align: center;">
<h2>Quality Assurance Document</h2>
<h3>Buggzi</h3>
<p>Authors: Kleo Hasani</p>
<i>QAD v1.0</i>
</div>

---

<small>Test Example:

| Test        | Name   | Status                                                    |
| :---------- | :----- | :-------------------------------------------------------- |
| ExampleTest | Test 1 | <p style="color: green; text-align: center;">&#10003;</p> |
| ExampleTest | Test 2 | <p style="color: red; text-align: center;">&#65794;</p>   |

</small>

---

# Unit Test Case

| Test    | Name                                        | Status                                                    |
| :------ | :------------------------------------------ | :-------------------------------------------------------- |
| Storage | Should have length of 0.                    | <p style="color: green; text-align: center;">&#10003;</p> |
| Storage | Should add 1 item to store.                 | <p style="color: green; text-align: center;">&#10003;</p> |
| Storage | Should get 1 item from store.               | <p style="color: green; text-align: center;">&#10003;</p> |
| Storage | Should update item value to "updated item". | <p style="color: green; text-align: center;">&#10003;</p> |
| Storage | Should update item key to 0000000000.       | <p style="color: green; text-align: center;">&#10003;</p> |
| Storage | Should delete 1 item.                       | <p style="color: green; text-align: center;">&#10003;</p> |
| UID     | Should generate random 16 byte string.      | <p style="color: green; text-align: center;">&#10003;</p> |

---

# UI Test Case

| Test              | Name                                        | Status                                                    |
| :---------------- | :------------------------------------------ | :-------------------------------------------------------- |
| Project List      | Should render list on screen.               | <p style="color: green; text-align: center;">&#10003;</p> |
| Project List Item | Should render enabled list item on screen.  | <p style="color: green; text-align: center;">&#10003;</p> |
| Project List Item | Should render disbaled list item on screen. | <p style="color: green; text-align: center;">&#10003;</p> |
| Submit Button     | Should render a submit button.              | <p style="color: green; text-align: center;">&#10003;</p> |
| Ticket List       | Should render list on screen.               | <p style="color: green; text-align: center;">&#10003;</p> |
| Ticket List Item  | Should render list item on screen.          | <p style="color: green; text-align: center;">&#10003;</p> |

---

# E2E Test Case

| Test        | Name               | Status                                                    |
| :---------- | :----------------- | :-------------------------------------------------------- |
| Application | Launch Application | <p style="color: green; text-align: center;">&#10003;</p> |
| Application | Create new project | <p style="color: red; text-align: center;">&#65794;</p>   |
| Application | Load project       | <p style="color: red; text-align: center;">&#65794;</p>   |
| Application | Delete project     | <p style="color: red; text-align: center;">&#65794;</p>   |
| Application | Create new ticket  | <p style="color: red; text-align: center;">&#65794;</p>   |
| Application | View ticket        | <p style="color: red; text-align: center;">&#65794;</p>   |
| Application | Update ticket      | <p style="color: red; text-align: center;">&#65794;</p>   |
| Application | Delete ticket      | <p style="color: red; text-align: center;">&#65794;</p>   |

---
