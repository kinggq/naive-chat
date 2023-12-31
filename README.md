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

const naiveChatRef = ref<NaiveChatType>()

// user info
const userInfo = {
  nickname: 'King',
  avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/RMksZlPP4myx9pbGzt3PmV2FNIpia8hVHpUXbHM0RfbJtsSMEWCLicbvGuJRMpoAam3sZclNo0YtOnvJ0a8eMtyQ/132',
  id: 1000,
}

onMounted(() => {
  naiveChatRef.value?.initContacts(contacts)
})

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
  ref="naiveChatRef"
  :user-info="userInfo"
  @change-contact="changeContact"
  @pull-message="pullMessage"
  @send="send"
/>
```

<br>

## Preview

![](https://github.com/kinggq/images/blob/main/view.png?raw=true)
