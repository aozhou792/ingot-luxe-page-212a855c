Luage 站点 → WooCommerce 导入包
================================

导出目录：D:\luage\woocommerce-export

本文件夹内：
- woocommerce-products.csv   （10 个在售口味商品）
- flavor-*.png               （与 CSV Images 列同名的产品图，与 CSV 同目录）

推荐导入步骤（WooCommerce 内置导入器）：
1. 将本文件夹内全部 .png 图片上传到 WordPress「媒体库」
   （可在 媒体 → 添加 中批量上传）。
2. WooCommerce → 产品 → 导入 → 选择 woocommerce-products.csv
3. 列映射保持默认（表头已与 WooCommerce 标准一致）。
4. Images 列填写的是文件名（如 flavor-peach-watermelon.png）。
   导入时 WooCommerce 会在当前月份的上传目录中按文件名匹配已上传的图片。
   若未自动关联，请在媒体库确认文件名与 CSV 完全一致后重新导入。

说明：
- 价格 Regular price 为 26（与站点 AUD $26.00 一致，请在 WooCommerce 货币设置中设为 AUD）。
- SKU 格式：ingot-9000-{slug}
- 共 10 个 simple 产品，分类：Disposable Vapes > Alibarbar Ingot
