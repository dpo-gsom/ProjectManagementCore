/* =========================================================
   M360 Core — Common Scripts
   Подключать перед основным скриптом страницы:
   <script src="common.js"></script>
   ========================================================= */

/**
 * Сообщает родительскому фрейму (Moodle) актуальную высоту страницы.
 * Вызывается автоматически при изменении контента через ResizeObserver.
 * Можно вызывать вручную: notifyHeight() — в конце каждого render().
 */
function notifyHeight() {
  var h = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight
  );
  try {
    window.parent.postMessage({ type: 'm360:resize', height: h }, '*');
  } catch (e) {
    /* Если страница открыта вне iframe — ошибка безопасна, игнорируем */
  }
}

/* Отслеживаем изменения размера body автоматически */
if (typeof ResizeObserver !== 'undefined') {
  var _ro = new ResizeObserver(function() { notifyHeight(); });
  _ro.observe(document.body);
}

/* Первый вызов после полной загрузки страницы */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', notifyHeight);
} else {
  notifyHeight();
}
