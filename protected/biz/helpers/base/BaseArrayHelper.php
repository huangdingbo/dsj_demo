<?php
namespace biz\helpers\base;

class BaseArrayHelper
{
    /**
     * 需要排序的数组
     * @param array $arr
     *
     * 排序的字段
     * @param $sortField
     *
     * 排序的类型，默认降序
     * @param int $sortType
     *
     * @return array
     * 二维数组根据某一个值进行排序
     *
     * 例子：
     *
    $ar1 = array(10, 100, 100, 0);
    $ar2 = array(1, 3, 2, 4);
    array_multisort($ar1, $ar2); //默认SORT_ASC

    var_dump($ar1);
    var_dump($ar2);

    //打印结果
    array(4) {
    [0]=> int(0)
    [1]=> int(10)
    [2]=> int(100)
    [3]=> int(100)
    }
    array(4) {
    [0]=> int(4)
    [1]=> int(1)
    [2]=> int(2)
    [3]=> int(3)
    }
    简单来说就是根据第一个数组的排序（SORT_ASC或SORT_DESC），返回键值对应的排序后的第二个数组。

    如上图 $ar2[3] = 4 对应 $ar1[3] = 0 ，当正序排列时 $ar1[3] = 0 最小变为 $ar1[0] = 0 ，对应 $ar2[0] = 4 。
     */
    public static function twoDimensionalArraySort(Array $arr,$sortField,$sortType = SORT_DESC){

        $sortArr = array_column($arr,$sortField);

        array_multisort($sortArr ,$sortType,$arr);

        return $arr;
    }

    /**
     * @param array $arr
     * @return array
     * 对数组进行升序排列
     */
    public static function sortAsc(Array $arr){
        sort($arr);

        return $arr;
    }

    /**
     * @param array $arr
     * @return array
     * 对数组进行降序排列
     */
    public static function sortDesc(Array $arr){
        rsort($arr);

        return $arr;
    }

    /**
     * @param array $arr
     * @return array
     * 根据关联数组的值，对数组进行升序排列
     */
    public static function sortByValueAsc(Array $arr){
        asort($arr);

        return $arr;
    }

    /**
     * @param array $arr
     * @return array
     * 根据关联数组的键，对数组进行升序排列
     */
    public static function sortByKeyAsc(Array $arr){
        ksort($arr);

        return $arr;
    }

    /**
     * @param array $arr
     * @return array
     * 根据关联数组的值，对数组进行降序排列
     */
    public static function sortByValueDesc(Array $arr){
        arsort($arr);

        return $arr;
    }

    /**
     * @param array $arr
     * @return array
     * 根据关联数组的键，对数组进行降序排列
     */
    public static function sortByKeyDesc(Array $arr){
        krsort($arr);

        return $arr;
    }

    /**
     * @param $array
     * @param $key
     * @param null $default
     * @return mixed|null
     * 获取数组中的值，可以设定默认值，如果没有为null
     * 用法：
     * $array = [
        'foo' => [
        'bar' => '123',
        ]
       ];
     *
     * ArrayHelper::getValue($array,'foo.bar.foo','')
     *
     */
    public static function getValue($array, $key, $default = null)
    {
        if ($key instanceof \Closure) {
            return $key($array, $default);
        }

        if (is_array($key)) {
            $lastKey = array_pop($key);
            foreach ($key as $keyPart) {
                $array = static::getValue($array, $keyPart);
            }
            $key = $lastKey;
        }

        if (is_array($array) && (isset($array[$key]) || array_key_exists($key, $array))) {
            return $array[$key];
        }

        if (($pos = strrpos($key, '.')) !== false) {
            $array = static::getValue($array, substr($key, 0, $pos), $default);
            $key = substr($key, $pos + 1);
        }

        if (is_object($array)) {
            return $array->$key;
        } elseif (is_array($array)) {
            return (isset($array[$key]) || array_key_exists($key, $array)) ? $array[$key] : $default;
        }

        return $default;
    }

    /**
     * @param $array
     * @param $path
     * @param $value
     * 往数组中插入值
     * 用法：
        $array = [
        'foo' => [
        'bar' => '123',
        ]
        ];
        ArrayHelper::setValue($array,'foo.test','123');
        或
        ArrayHelper::setValue($array, ['foo', 'test'],'123');
     */
    public static function setValue(&$array, $path, $value)
    {
        if ($path === null) {
            $array = $value;
            return;
        }

        $keys = is_array($path) ? $path : explode('.', $path);

        while (count($keys) > 1) {
            $key = array_shift($keys);
            if (!isset($array[$key])) {
                $array[$key] = [];
            }
            if (!is_array($array[$key])) {
                $array[$key] = [$array[$key]];
            }
            $array = &$array[$key];
        }

        $array[array_shift($keys)] = $value;
    }

    /**
     * @param $key
     * @param $array
     * @param bool $caseSensitive
     * @return bool
     * ArrayHelper::keyExists 工作原理和 array_key_exists 差不多，除了 它还可支持大小写不敏感的键名比较
     */
    public static function keyExists($key, $array, $caseSensitive = true)
    {
        if ($caseSensitive) {
            return isset($array[$key]) || array_key_exists($key, $array);
        }

        foreach (array_keys($array) as $k) {
            if (strcasecmp($key, $k) === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param $array
     * @param $name
     * @param bool $keepKeys
     * @return array
     *效果跟array_column差不多，唯一的区别在于支持匿名函数取值‘
     *
     * 用法：
     *
     * $result = ArrayHelper::getColumn($array, function ($element) {
            return $element['id'];
        });
     */
    public static function getColumn($array, $name, $keepKeys = true)
    {
        $result = [];
        if ($keepKeys) {
            foreach ($array as $k => $element) {
                $result[$k] = static::getValue($element, $name);
            }
        } else {
            foreach ($array as $element) {
                $result[] = static::getValue($element, $name);
            }
        }

        return $result;
    }

    /**
     * @param $array
     * @param $key
     * @param array $groups
     * @return array
     *提KEY操作
     *
     * 用法：
     * $array = [
        ['id' => '123', 'data' => 'abc', 'device' => 'laptop'],
        ['id' => '345', 'data' => 'def', 'device' => 'tablet'],
        ['id' => '345', 'data' => 'hgi', 'device' => 'smartphone'],
        ];
        $result = ArrayHelper::index($array, 'id');
     *
     * 上面的一种用法，值相等的id将回被覆盖
     *
     * $result = ArrayHelper::index($array, null, 'id');
     * 这样用就不会被覆盖，结果将变成这样
     * [
        '123' => [
        ['id' => '123', 'data' => 'abc', 'device' => 'laptop']
        ],
        '345' => [ // all elements with this index are present in the result array
        ['id' => '345', 'data' => 'def', 'device' => 'tablet'],
        ['id' => '345', 'data' => 'hgi', 'device' => 'smartphone'],
        ]
      ]
     *
     * 也可以使用匿名函数来指定key
     * $result = ArrayHelper::index($array, null, 'id');
     */
    public static function index($array, $key, $groups = [])
    {
        $result = [];
        $groups = (array) $groups;

        foreach ($array as $element) {
            $lastArray = &$result;

            foreach ($groups as $group) {
                $value = static::getValue($element, $group);
                if (!array_key_exists($value, $lastArray)) {
                    $lastArray[$value] = [];
                }
                $lastArray = &$lastArray[$value];
            }

            if ($key === null) {
                if (!empty($groups)) {
                    $lastArray[] = $element;
                }
            } else {
                $value = static::getValue($element, $key);
                if ($value !== null) {
                    if (is_float($value)) {
                        $value = str_replace(',', '.', (string) $value);
                    }
                    $lastArray[$value] = $element;
                }
            }
            unset($lastArray);
        }

        return $result;
    }

    /**
     * Builds a map (key-value pairs) from a multidimensional array or an array of objects.
     * The `$from` and `$to` parameters specify the key names or property names to set up the map.
     * Optionally, one can further group the map according to a grouping field `$group`.
     *
     * For example,
     *
     * ```php
     * $array = [
     *     ['id' => '123', 'name' => 'aaa', 'class' => 'x'],
     *     ['id' => '124', 'name' => 'bbb', 'class' => 'x'],
     *     ['id' => '345', 'name' => 'ccc', 'class' => 'y'],
     * ];
     *
     * $result = ArrayHelper::map($array, 'id', 'name');
     * // the result is:
     * // [
     * //     '123' => 'aaa',
     * //     '124' => 'bbb',
     * //     '345' => 'ccc',
     * // ]
     *
     * $result = ArrayHelper::map($array, 'id', 'name', 'class');
     * // the result is:
     * // [
     * //     'x' => [
     * //         '123' => 'aaa',
     * //         '124' => 'bbb',
     * //     ],
     * //     'y' => [
     * //         '345' => 'ccc',
     * //     ],
     * // ]
     * ```
     *
     * @param array $array
     * @param string|\Closure $from
     * @param string|\Closure $to
     * @param string|\Closure $group
     * @return array
     */
    public static function map($array, $from, $to, $group = null)
    {
        $result = [];
        foreach ($array as $element) {
            $key = static::getValue($element, $from);
            $value = static::getValue($element, $to);
            if ($group !== null) {
                $result[static::getValue($element, $group)][$key] = $value;
            } else {
                $result[$key] = $value;
            }
        }

        return $result;
    }

    /**
     * @param $array
     * @param $key
     * @param int $direction
     * @param int $sortFlag
     * @throws \CErrorException
     * 用法：
     * $data = [
        ['age' => 30, 'name' => 'Alexander'],
        ['age' => 30, 'name' => 'Brian'],
        ['age' => 19, 'name' => 'Barney'],
        ];
        ArrayHelper::multisort($data, ['age'], [SORT_DESC]);
     *
     *
     *
     * 第二个参数指定排序的键名，如果是单键名的话可以是字符串，如果是多键名则是一个数组， 或者是如下例所示的一个匿名函数：

        ArrayHelper::multisort($data, function($item) {
        return isset($item['age']) ? ['age', 'name'] : 'name';
        });
     *
     *
     * 第三个参数表示增降顺序。单键排序时，它可以是 SORT_ASC 或者 SORT_DESC 之一。如果是按多个键名排序，你可以用一个数组为 各个键指定不同的顺序。

        最后一个参数（译者注：第四个参数）是PHP的排序标识（sort flag），可使用的值和调用 PHP sort() 函数时传递的值一样。
     */
    public static function multisort(&$array, $key, $direction = SORT_ASC, $sortFlag = SORT_REGULAR)
    {
        $keys = is_array($key) ? $key : [$key];
        if (empty($keys) || empty($array)) {
            return;
        }
        $n = count($keys);
        if (is_scalar($direction)) {
            $direction = array_fill(0, $n, $direction);
        } elseif (count($direction) !== $n) {
            throw new \CErrorException('The length of $direction parameter must be the same as that of $keys.');
        }
        if (is_scalar($sortFlag)) {
            $sortFlag = array_fill(0, $n, $sortFlag);
        } elseif (count($sortFlag) !== $n) {
            throw new \CErrorException('The length of $sortFlag parameter must be the same as that of $keys.');
        }
        $args = [];
        foreach ($keys as $i => $key) {
            $flag = $sortFlag[$i];
            $args[] = static::getColumn($array, $key);
            $args[] = $direction[$i];
            $args[] = $flag;
        }

        $args[] = range(1, count($array));
        $args[] = SORT_ASC;
        $args[] = SORT_NUMERIC;

        $args[] = &$array;
        call_user_func_array('array_multisort', $args);
    }

    /**
     * @param $a
     * @param $b
     * @return array|mixed
     *您可以使用 ArrayHelper::merge() 将两个或多个数组合并成一个递归的数组。
     * 如果每个数组都有一个具有相同字符串键值的元素，则后者将覆盖前者 （不同于 array_merge_recursive()）。
     * 如果两个数组都有一个数组类型的元素并且具有相同的键，则将执行递归合并。
     * 对于整数键的元素，来自后一个数组的元素将被附加到前一个数组。
     * 您可以使用 biz\helpers\base\UnsetArrayValue 对象来取消前一个数组的值或  biz\helpers\base\ReplaceArrayValue 以强制替换先前的值而不是递归合并。
     */
    public static function merge($a, $b)
    {
        $args = func_get_args();
        $res = array_shift($args);
        while (!empty($args)) {
            foreach (array_shift($args) as $k => $v) {
                if ($v instanceof UnsetArrayValue) {
                    unset($res[$k]);
                } elseif ($v instanceof ReplaceArrayValue) {
                    $res[$k] = $v->value;
                } elseif (is_int($k)) {
                    if (array_key_exists($k, $res)) {
                        $res[] = $v;
                    } else {
                        $res[$k] = $v;
                    }
                } elseif (is_array($v) && isset($res[$k]) && is_array($res[$k])) {
                    $res[$k] = self::merge($res[$k], $v);
                } else {
                    $res[$k] = $v;
                }
            }
        }

        return $res;
    }

}