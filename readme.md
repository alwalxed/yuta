# Yuta

Yuta simplifies domain enumeration by streamlining the entire process into a single tool. It handles domain discovery, DNS probing, HTTP probing, and filters out irrelevant results, providing you with clean, actionable data effortlessly.

## 🌟 Features

- **Domain Enumeration**: Powered by [Amass](https://github.com/owasp-amass/amass)
- **DNS Probing**: Utilizes [DNSx](https://github.com/projectdiscovery/dnsx)
- **HTTP Probing**: Employs [HTTPx](https://github.com/projectdiscovery/httpx)
- **Result Filtering**: Excludes non-functional domains, such as those returning 404 errors.
- **Clean Output**: Presents results in a clear and organized format.

## 🛠️ Requirements

- **Node.js**: Version 16 or higher is required.
- **Docker**: Required for running the tools used by Yuta.

## 💾 Installation

To install Yuta, use npm:

```
npm install -g yuta
```

Then, set up the necessary tools with:

```
yuta install
```

## 🔍️ Usage

To scan a domain, run:

```
yuta scan example.com
```

## 🤝 Contributing

Contributions are welcome! Please submit issues or pull requests to help improve Yuta.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/alwalxed/yuta/blob/main/LICENSE) file for more information.
