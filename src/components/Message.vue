<template>
  <div py-20px font-500 text="26px left">
    Message
  </div>
  <table>
    <thead>
      <th width="180px">
        Name
      </th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
      <th>Version</th>
    </thead>
    <tbody>
      <tr>
        <td>id</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>必须</td>
        <td>消息唯一标识</td>
        <td />
      </tr>
      <tr>
        <td>content</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>''</td>
        <td>消息内容</td>
        <td />
      </tr>
      <tr>
        <td>type</td>
        <td>
          <code>
            'text' | 'event' | 'file' | 'image'
          </code>
        </td>
        <td>'text'</td>
        <td>消息类型</td>
        <td />
      </tr>
      <tr>
        <td>toContactId</td>
        <td>
          <code>
            number
          </code>
        </td>
        <td>必须</td>
        <td>接受消息的联系人ID</td>
        <td />
      </tr>
      <tr>
        <td>fromUser</td>
        <td>
          <code>
            { id:number; nickname: string; avatar: string }
          </code>
        </td>
        <td>必须</td>
        <td>发送消息的人</td>
        <td />
      </tr>
      <tr>
        <td>sendTime</td>
        <td>
          <code>
            number
          </code>
        </td>
        <td>必须</td>
        <td>发送的时间</td>
        <td />
      </tr>
      <tr>
        <td>status</td>
        <td>
          <code>
            'success' | 'error' | 'going'
          </code>
        </td>
        <td>必须</td>
        <td>消息状态</td>
        <td />
      </tr>
      <tr>
        <td>fileName</td>
        <td>
          <code>
            string
          </code>
        </td>
        <td>可选</td>
        <td>文件名</td>
        <td />
      </tr>
      <tr>
        <td>fileSize</td>
        <td>
          <code>
            number
          </code>
        </td>
        <td>可选</td>
        <td>文件大小</td>
        <td />
      </tr>
    </tbody>
  </table>
</template>
