import React, { useState, useMemo } from "react";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Input, Button, Tabs, Table, Select, Pagination, Avatar } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import styles from "./Users.module.scss";
import { IoSearchOutline } from "react-icons/io5";

const { TabPane } = Tabs;
const { Option } = Select;

interface User {
  key: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  joined: string;
  orders: number;
  totalSpent: number;
  initials: string;
}

const mockUsers: User[] = [
  {
    key: "1",
    name: "Emma Wilson",
    email: "emma@example.com",
    status: "active",
    joined: "Jan 5, 2026",
    orders: 3,
    totalSpent: 898.0,
    initials: "EW",
  },
  {
    key: "2",
    name: "James Chen",
    email: "james@company.io",
    status: "active",
    joined: "Jan 12, 2026",
    orders: 1,
    totalSpent: 599.0,
    initials: "JC",
  },
  {
    key: "3",
    name: "Sofia Garcia",
    email: "sofia@startup.co",
    status: "active",
    joined: "Dec 18, 2025",
    orders: 2,
    totalSpent: 1548.0,
    initials: "SG",
  },
  {
    key: "4",
    name: "Alex Thompson",
    email: "alex@dev.com",
    status: "active",
    joined: "Jan 20, 2026",
    orders: 1,
    totalSpent: 79.0,
    initials: "AT",
  },
  {
    key: "5",
    name: "Maria Santos",
    email: "maria@agency.co",
    status: "active",
    joined: "Dec 2, 2025",
    orders: 1,
    totalSpent: 299.0,
    initials: "MS",
  },
  {
    key: "6",
    name: "David Kim",
    email: "david@tech.io",
    status: "inactive",
    joined: "Nov 15, 2025",
    orders: 1,
    totalSpent: 0.0,
    initials: "DK",
  },
  {
    key: "7",
    name: "Lisa Park",
    email: "lisa@design.co",
    status: "active",
    joined: "Jan 8, 2026",
    orders: 1,
    totalSpent: 299.0,
    initials: "LP",
  },
  {
    key: "8",
    name: "Ryan Mitchell",
    email: "ryan@startup.io",
    status: "active",
    joined: "Dec 28, 2025",
    orders: 1,
    totalSpent: 1499.0,
    initials: "RM",
  },
  {
    key: "9",
    name: "Nina Patel",
    email: "nina@corp.com",
    status: "active",
    joined: "Jan 15, 2026",
    orders: 1,
    totalSpent: 79.0,
    initials: "NP",
  },
  {
    key: "10",
    name: "Tom Bradley",
    email: "tom@agency.io",
    status: "active",
    joined: "Jan 22, 2026",
    orders: 1,
    totalSpent: 599.0,
    initials: "TB",
  },
];

const Users: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    if (activeTab === "active") {
      filtered = filtered.filter((user) => user.status === "active");
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((user) => user.status === "inactive");
    }

    if (searchValue) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return filtered;
  }, [activeTab, searchValue]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, currentPage, pageSize]);

  const totalUsers = filteredUsers.length;

  const columns: ColumnsType<User> = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className={styles.customerCell}>
          <Avatar className={styles.avatar}>{record.initials}</Avatar>
          <div className={styles.customerInfo}>
            <div className={styles.customerName}>{record.name}</div>
            <div className={styles.customerEmail}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`${styles.status} ${styles[status]}`}>{status}</span>
      ),
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (totalSpent) => `$${totalSpent.toFixed(2)}`,
    },
  ];

  const handleExport = () => {
    const headers = [
      "Customer",
      "Email",
      "Status",
      "Joined",
      "Orders",
      "Total Spent",
    ];
    const csvData = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.status,
      user.joined,
      user.orders,
      user.totalSpent,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Customers</h1>
          <p className={styles.subtitle}>View and manage your customer base.</p>
        </div>
      </div>

      <div className={styles.tabsSection}>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className={styles.tabs}
        >
          <TabPane tab="All" key="all" />
          <TabPane tab="Active" key="active" />
          <TabPane tab="Inactive" key="inactive" />
        </Tabs>
      </div>

      <div className={styles.tableControls}>
        <div className={styles.leftControls}>
        
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>
              <IoSearchOutline />
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={t("searchPlaceholder")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.rightControls}>
          <Button icon={<FilterOutlined />} className={styles.filterButton}>
            Filter
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExport}
            className={styles.exportButton}
          >
            Export
          </Button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          dataSource={paginatedUsers}
          pagination={false}
          className={styles.table}
        />
      </div>

      <div className={styles.paginationSection}>
        <div className={styles.paginationInfo}>
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalUsers)}-
          {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} results
        </div>
        <div className={styles.paginationControls}>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            className={styles.pageSizeSelect}
            options={[
              { value: 10, label: "Rows 10" },
              { value: 20, label: "Rows 20" },
              { value: 50, label: "Rows 50" },
            ]}
          />
          <Pagination
            current={currentPage}
            total={totalUsers}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            className={styles.pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
