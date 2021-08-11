# Notify.Events для GitHub Action

Интеграция позволяет отправлять уведомления из [GitHub Action](https://github.com/features/actions) в [40+ мессенджеров и другие средства связи](https://notify.events/#sRecipients).

Получайте мгновенные оповещения в Slack, Signal, MS Teams, Discord, по SMS и другими способами. Применяйте простое форматирование текста, назначайте уведомлениям уровень и приоритет, чтобы фильтровать сообщения или распределять их между разными членами команды/мессенджерами.

Посмотрите полный список поддерживаемых мессенджеров [здесь](https://notify.events/features).

[![Actions Status](https://github.com/notify-events/github-action/workflows/test/badge.svg)](https://github.com/notify-events/github-action/actions)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/notify-events/github-action/blob/master/LICENSEs)

#### Инструкция на других языках

* [English](../../README.md)

## Пример использования

Отправка уведомления

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
          text:  Это моё сообщение
```

## Переменные

* token - (**обязательный**) Notify.Events token канала
* title - Заголовок сообщения
* text - (**обязательный**) Текст сообщения (допустимы простые html-теги: \<b>, \<i>, \<br>, \<a href="...">)
* priority - Приоритет сообщения (highest, high, normal, low, lowest)
* level - Уровень сообщения (verbose, info, notice, warning, error, success)

```yaml
uses: notify-events/github-action@main
with:
  token: ${{ secrets.NE_CHANNEL_TOKEN }}
  title: Build success
  text: Build ${{ github.ref }} successfully
  priority: info
  level: success 
```

### Предустановленные типы сообщений:

* verbose - Тест сообщения с 'verbose' уровнем и 'lowest' приоритетом
* info - Тест сообщения с 'info' уровнем и 'low' приоритетом
* notice - Тест сообщения с 'notice' уровнем и 'low' приоритетом
* success - Тест сообщения с 'success' уровнем и 'normal' приоритетом
* warning - Тест сообщения с 'warning' уровнем и 'high' приоритетом
* error - Тест сообщения с 'error' уровнем и 'highest' приоритетом

```yaml
uses: notify-events/github-action@main
with:
  token: $(( secrets.NE_CHANNEL_TOKEN }}
  success: Build {{ github.ref }} successfully
```
