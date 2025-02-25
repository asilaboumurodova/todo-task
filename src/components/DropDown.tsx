import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Typography, Button, Divider } from "antd";
import { Context } from "../context/Context";
import { useContext, useState, useEffect } from "react";

interface DropDownProps {
  cardIndex?: number;
}

function DropDown({ cardIndex = 0 }: DropDownProps) {
  const { lang } = useContext(Context)!;
  const [visible, setVisible] = useState(true);
  const [filter, setFilter] = useState("all");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const getItemsForCard = () => {
    if (cardIndex === 0) {
      return [
        { key: "0", text: lang.first },
        { key: "1", text: lang.second },
        { key: "2", text: lang.third },
      ];
    } else if (cardIndex === 1) {
      return [
        { key: "3", text: lang.fourth },
        { key: "4", text: lang.fifth },
        { key: "5", text: lang.sixth },
      ];
    } else {
      return [
        { key: "6", text: lang.seventh },
        { key: "7", text: lang.eighth },
        { key: "8", text: lang.ninth },
      ];
    }
  };

  const items = getItemsForCard();

  useEffect(() => {
    const initialCheckedItems: Record<string, boolean> = {};
    items.forEach((item) => {
      initialCheckedItems[item.key] = false;
    });
    setCheckedItems(initialCheckedItems);
  }, [cardIndex]);

  const onChange = (key: string) => (e: any) => {
    e.stopPropagation();
    setCheckedItems({ ...checkedItems, [key]: e.target.checked });
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const getItemsLeft = () => {
    return items.filter((item) => !checkedItems[item.key]).length;
  };

  const clearCompleted = () => {
    const newCheckedItems = { ...checkedItems };
    Object.keys(newCheckedItems).forEach((key) => {
      newCheckedItems[key] = false;
    });
    setCheckedItems(newCheckedItems);
  };

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !checkedItems[item.key];
    if (filter === "completed") return checkedItems[item.key];
    return true;
  });

  const { Text } = Typography;

  return (
    <div
      className="todo-dropdown"
      style={{
        width: "100%",
        minWidth: "320px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <div
        onClick={toggleDropdown}
        style={{
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Text strong>{lang.title}</Text>
        <DownOutlined
          style={{ transform: visible ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {visible && (
        <div style={{ padding: "0 10px" }}>
          {filteredItems.map((item, index) => (
            <div key={item.key}>
              <div
                style={{
                  padding: "15px 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={checkedItems[item.key]}
                  onChange={onChange(item.key)}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: "100%" }}
                >
                  <Text
                    style={{
                      textDecoration: checkedItems[item.key]
                        ? "line-through"
                        : "none",
                      color: checkedItems[item.key] ? "#aaa" : "inherit",
                    }}
                  >
                    {item.text}
                  </Text>
                </Checkbox>
              </div>

              {index < filteredItems.length - 1 && (
                <Divider style={{ margin: "0" }} />
              )}
            </div>
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px 10px",
              borderTop: "1px solid #f0f0f0",
              fontSize: "14px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <div style={{ minWidth: "80px" }}>{getItemsLeft()} items left</div>
            <div style={{ 
              display: "flex", 
              gap: "4px", 
              flex: "1",
              justifyContent: "center" 
            }}>
              <Button
                type={filter === "all" ? "primary" : "text"}
                size="small"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                type={filter === "active" ? "primary" : "text"}
                size="small"
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
              <Button
                type={filter === "completed" ? "primary" : "text"}
                size="small"
                onClick={() => setFilter("completed")}
              >
                Completed
              </Button>
            </div>
            <Button 
              type="text" 
              size="small" 
              onClick={clearCompleted}
              style={{ minWidth: "110px" }}
            >
              Clear completed
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;