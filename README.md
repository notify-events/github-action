# Notify.Events for GitHub Action

[GitHub Action](https://github.com/features/actions) for sending a notification message for [30+ messengers and other services](https://notify.events#sRecipients).

[![Actions Status](https://github.com/notify-events/github-action/workflows/test/badge.svg)](https://github.com/notify-events/github-action/actions)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/notify-events/github-action/blob/master/LICENSEs)

## Usage

Send custom message

```yaml
name: notify.events message
on: [push]
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: send custom message
        uses: notify-events/github-action@main
        with:
          token: ${{ secrets.NE_CHANNEL_TOKEN }}
          text:  This is message
```

## Input variables

* token - (**required**) Notify.Events channel token
* title - Message title
* text - (**required**) Message text (allow simple html tags: \<b>, \<i>, \<br>, \<a href="...">)
* priority - Message priority (highest, high, normal, low, lowest)
* level - Message level (verbose, info, notice, warning, error, success)

```yaml
uses: notify-events/github-action@main
with:
  token: ${{ secrets.NE_CHANNEL_TOKEN }}
  title: Build success
  text: Build ${{ github.ref }} successfully
  priority: info
  level: success 
```

### Predefined simple message:

* verbose - Message text with 'verbose' level and 'lowest' priority
* info - Message text with 'info' level and 'low' priority
* notice - Message text with 'notice' level and 'low' priority
* success - Message text with 'success' level and 'normal' priority
* warning - Message text with 'warning' level and 'high' priority
* error - Message text with 'error' level and 'highest' priority

```yaml
uses: notify-events/github-action@main
with:
  token: $(( secrets.NE_CHANNEL_TOKEN }}
  success: Build {{ github.ref }} successfully
```
