<template>
  <div py-20px font-500 text="26px left">
    Slots
  </div>
  <table>
    <thead>
      <tr>
        <th width="180px">
          Name
        </th>
        <th>Parameters</th>
        <th>Description</th>
        <th>Version</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>sidebar-contact</td>
        <td><code>()</code></td>
        <td>自定义左侧联系人面板</td>
        <td />
      </tr>
      <tr>
        <td>sidebar-other</td>
        <td><code>()</code></td>
        <td>自定义左侧内容</td>
        <td />
      </tr>
      <tr>
        <td>message-tools</td>
        <td><code>upload: (file: File) => void</code></td>
        <td>自定义聊天窗口输入框上方左侧工具栏, upload参数是一个函数，接受一个File类型，处理发送文件</td>
        <td />
      </tr>
      <tr>
        <td>message-tools-right</td>
        <td><code>()</code></td>
        <td>自定义聊天窗口输入框上方右侧工具栏</td>
        <td />
      </tr>
      <tr>
        <td>default-page</td>
        <td><code>()</code></td>
        <td>自定义右侧默认页面</td>
        <td />
      </tr>
      <tr>
        <td>sidebar-header</td>
        <td><code>()</code></td>
        <td>自定义左侧近期联系人头部</td>
        <td />
      </tr>
      <tr>
        <td>sidebar-contact-header</td>
        <td><code>()</code></td>
        <td>自定义左侧联系人头部</td>
        <td />
      </tr>
    </tbody>
  </table>
</template>
