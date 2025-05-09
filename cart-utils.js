// 計算總金額
function updateTotal() {
    const menuItems = document.querySelectorAll('.menu-item');
    let total = 0;

    menuItems.forEach(item => {
        total += calculateItemTotal(item);
    });

    document.getElementById('totalPrice').innerText = total;
}

// 計算單一品項的金額
function calculateItemTotal(item) {
    const basePrice = parseInt(item.getAttribute('data-price')) || 0;
    let itemTotal = 0;

    itemTotal += getInputValue(item, '.small-qty') * basePrice;
    itemTotal += getInputValue(item, '.large-qty') * (basePrice + 20);

    // 台式/日式 (N-qty)
  item.querySelectorAll('.N-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  });

  // 彩虹麵 (R-qty)
  item.querySelectorAll('.R-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  });

  //刈包
  item.querySelectorAll('.Yibao-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })   
  //炒手
  item.querySelectorAll('.Dumpling-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  }) 
  //滷味
  item.querySelectorAll('.Braised-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })
  //甜點
  item.querySelectorAll('.dessert-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })
  //飲品
  item.querySelectorAll('.drinks-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })
  //冷飲
  item.querySelectorAll('.cold-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })
  //熱飲
  item.querySelectorAll('.hot-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })
  //冰飲
  item.querySelectorAll('.iced-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })
  //熱湯
  item.querySelectorAll('.soup-qty').forEach(input => {
    itemTotal += (parseInt(input.value) || 0) * (basePrice + getExtraPrice(input));
  })

    return itemTotal;
}

//事件監聽器
document.addEventListener("DOMContentLoaded", () => {
    const quantityInputs = document.querySelectorAll('.menu-item input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateTotal); // 用戶手動輸入數量時更新總金額
    });

    updateTotal(); // 初始載入時也更新一次
});

// ===== 子功能：安全取得 input 數值，避免 NaN =====
function getInputValue(parent, selector) {
    return parseInt(parent.querySelector(selector)?.value) || 0;
}

// ===== 子功能：取得額外加價 (extra) =====
function getExtraPrice(input) {
    return parseInt(input.getAttribute('data-extra')) || 0;
}

// 取得 input 數值
function getInputValue(parent, selector) {
    return parseInt(parent.querySelector(selector)?.value) || 0;
}

// 清空輸入與總金額
function clearAll() {
    document.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
        input.value = '';
    });
    document.getElementById('totalPrice').innerText = 0;
    const summary = document.getElementById('order-summary');
    if (summary) summary.innerText = '';
}

// 加入購物車功能
function addToCart() {
    const menuItems = document.querySelectorAll('.menu-item');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    menuItems.forEach(item => {
        const name = item.getAttribute('data-name');
        const basePrice = parseInt(item.getAttribute('data-price')) || 0;

        const smallQty = getInputValue(item, '.small-qty');
        const largeQty = getInputValue(item, '.large-qty');

        if (smallQty > 0) {
            cart.push({
                name: name + "（小）",
                price: basePrice,
                quantity: smallQty
            });
        }

        if (largeQty > 0) {
            cart.push({
                name: name + "（大）",
                price: basePrice + 20,
                quantity: largeQty
            });
        }

        // 處理刈包數量（Yibao-qty）
        item.querySelectorAll('.Yibao-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        // 處理炒手數量 (Dumpling-qty)
        item.querySelectorAll('.Dumpling-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理麵食數量(N-qty)
        item.querySelectorAll('.N-qty').forEach((input, idx) => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                const noodleType = (idx % 2 === 0) ? '陽春' : '拉麵';  // 根據索引判斷麵條種類
                cart.push({
                    name: `${name} ${noodleType}`,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理麵食數量(R-qty)
        item.querySelectorAll('.R-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name + ` 彩虹麵`,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理滷味數量
        item.querySelectorAll('.Braised-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理湯數量
        item.querySelectorAll('.soup-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理飲料數量
        item.querySelectorAll('.drinks-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理冰飲數量
        item.querySelectorAll('.iced-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name + ` 冰`,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理冷飲數量
        item.querySelectorAll('.cold-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name + ` 冷` ,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        //處理熱飲數量
        item.querySelectorAll('.hot-qty').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const extra = getExtraPrice(input);
                cart.push({
                    name: name +  ` 熱`,
                    price: basePrice + extra,
                    quantity: qty
                });
            }
        });
        // 處理備註
        const noteInput = item.parentElement.querySelector('.note');
        if (noteInput && noteInput.value.trim() !== "") {
            cart.push({
                name: "備註",
                price: 0,
                quantity: 1,
                note: noteInput.value.trim()
            });
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    //alert("已加入購物車！");
}
