// Replace import with dynamic fetch
export let lotteryImages = [];

export async function fetchLotteryImages() {
  try {
    const res = await fetch('/admin/lottery/images', { credentials: 'include' });
    const data = await res.json();
    if (data.success) {
      lotteryImages = data.images;
    } else {
      lotteryImages = [];
    }
  } catch (e) {
    lotteryImages = [];
  }
}
