## Install

```bash
npm i naive-chat@latest
```

## Usage

```ts
// main.ts
import 'naive-chat/dist/style.css'
```

```ts
import type { Contact, Message, PullMessageOption, SendOption } from 'naive-chat'

import { NaiveChat } from 'naive-chat'

// user info
const userInfo = {
  nickname: 'King',
  avatar: '',
  id: 1000,
}

const contacts = ref<Contact[]>([
  {
    id: 1,
    nickname: '',
    avatar: '',
    lastMessage: '',
    lastTime: Date.now(),
    index: 'A',
  }
])

const messages: Message[] = [
  {
    id: generateUUID(),
    content: '',
    type: 'file',
    toContactId: 1000,
    status: 'success',
    sendTime: 1691056800000,
    fileName: '艳萍简历.doc',
    fileSize: 18238,
    fromUser: {
      id: 1,
      avatar: avatar1,
    },
  },
  {
    id: generateUUID(),
    content: '',
    type: 'file',
    toContactId: 1,
    status: 'success',
    sendTime: 1691056800000,
    fileName: '我的简历.js',
    fileSize: 18238,
    fromUser: {
      id: 1000,
      avatar: avatar2,
    },
  },
]

function pullMessage({ next, contactId }: PullMessageOption) {
  // console.log('pullMessage')
  if (contactId === 1) {
    asyncFn(() => {
      next(messages, true)
    })
  }
  else {
    asyncFn(() => {
      next([], true)
    })
  }
}

function asyncFn(fn: () => void) {
  setTimeout(() => {
    fn()
  }, 1000)
}

function send({ message, next }: SendOption) {
  asyncFn(() => {
    next({
      id: message.id,
      toContactId: message.toContactId,
      status: 'success',
    })
  })
}
```

```html
<NaiveChat
  :user-info="userInfo"
  :contacts="contacts"
  @change-contact="changeContact"
  @pull-message="pullMessage"
  @send="send"
/>
```

<br>

## Preview

![](https://user-images.githubusercontent.com/10386838…58769802-07cfafd5-32ee-48cd-b224-350725dd9bd3.png)

![](https://user-images.githubusercontent.com/10386838…58770066-5740b50f-101c-497b-ba81-bf20eaa1e74f.png)

![](https://user-images.githubusercontent.com/10386838…58770545-b04583e9-86cc-4fe6-8ee5-f25708ab2285.png)
