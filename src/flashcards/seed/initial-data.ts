// ============================================================
// BO CÂU HOI – TRẢ LỜI CHUẨN FULLSTACK JUNIOR (THỜI ĐẠI AI)
// ============================================================
// Mỗi card gồm: question, answer, codeExamples, painPoints
// Quy tắc viết:
//   - PainPoint: mô tả "nỗi đau" khi dùng công nghệ cũ / sai cách
//   - Code examples: ví dụ chạy được, minh họa đúng + sai
// ============================================================

export const INITIAL_TOPICS = [
  {
    slug: 'javascript-typescript',
    title: 'JavaScript & TypeScript',
    description:
      'Nền tảng ngôn ngữ và type system để phòng vấn fullstack. Từ closure, prototype, event loop đến generics, utility types.',
    order: 1,
  },
  {
    slug: 'nestjs',
    title: 'NestJS',
    description:
      'Backend architecture, Dependency Injection, Guard, Pipe, Interceptor và best practices để xây dựng API chuyên nghiệp.',
    order: 2,
  },
  {
    slug: 'mongodb',
    title: 'MongoDB',
    description:
      'Schema design, indexing, aggregation pipeline và tối ưu query để làm việc hiệu quả với MongoDB trong ứng dụng thực tế.',
    order: 3,
  },
  {
    slug: 'nextjs-react',
    title: 'Next.js & React',
    description:
      'App Router, Server Components, Client Components, hooks, state management và tối ưu performance cho React/Next.js.',
    order: 4,
  },
  {
    slug: 'devops',
    title: 'DevOps & Git',
    description:
      'Git workflow, Docker cơ bản, CI/CD pipeline, environment variables và deploy ứng dụng lên production.',
    order: 5,
  },
  {
    slug: 'ai-llm',
    title: 'AI & LLM Integration',
    description:
      'Prompt engineering, function calling, RAG, streaming response và tích hợp OpenAI / Claude vào ứng dụng thực tế.',
    order: 6,
  },
];

export const INITIAL_FLASHCARDS = [
  // ============================================================
  // JAVASCRIPT & TYPESCRIPT
  // ============================================================
  {
    topicSlug: 'javascript-typescript',
    slug: 'closure',
    question: 'Closure là gì? Cho ví dụ thực tế khi nào bạn cần dùng closure.',
    answer:
      'Closure là khi một function ghi nhớ biến từ scope bên ngoài ngay cả khi function đó được gọi ở ngoài scope gốc. Closure cho phép tạo private state, memoization, currying và factory function.',
    difficulty: 'basic',
    tags: ['javascript', 'closure', 'scope'],
    codeExamples: [
      {
        language: 'javascript',
        title: 'Closure cơ bản — đếm số lần gọi',
        code: `function createCounter() {
  let count = 0; // biến private — không truy cập được từ bên ngoài
  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// count không thể truy cập trực tiếp: console.log(count) → ReferenceError`,
      },
      {
        language: 'javascript',
        title: 'Sai — closure trong vòng lặp (var)',
        code: `// Vấn đề: var không có block scope
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 ← Tất cả đều log giá trị cuối cùng của i

// Đúng — dùng let hoặc IIFE
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ← Mỗi lần lặp tạo scope mới`,
      },
    ],
    painPoints: [
      {
        title: 'Dùng var trong closure — bug khó phát hiện',
        description:
          'var có function scope chứ không phải block scope. Khi dùng trong vòng for kết hợp setTimeout, callback sẽ đọc giá trị cuối cùng của biến sau khi vòng lặp kết thúc.',
        consequence:
          'Bug "0,1,2" trở thành "3,3,3" → console log sai hoàn toàn mà không có error → khó debug khi codebase lớn.',
      },
    ],
  },

  {
    topicSlug: 'javascript-typescript',
    slug: 'event-loop',
    question:
      'Event Loop là gì? Phân biệt microtask (Promise) và macrotask (setTimeout). Cho thứ tự output chính xác.',
    answer:
      'JavaScript chạy single-threaded. Event Loop liên tục kiểm tra Call Stack — nếu trống thì lấy task từ Microtask Queue xử lý TRƯỚC, rồi mới đến Macrotask Queue. Microtask: Promise.then, async/await, queueMicrotask. Macrotask: setTimeout, setInterval, I/O, UI rendering.',
    difficulty: 'intermediate',
    tags: ['javascript', 'event-loop', 'async'],
    codeExamples: [
      {
        language: 'javascript',
        title: 'Thứ tự output — giải thích từng bước',
        code: `console.log('1 - sync start');

setTimeout(() => console.log('2 - macrotask'), 0);

Promise.resolve()
  .then(() => console.log('3 - microtask'))
  .then(() => console.log('4 - microtask sau microtask'));

console.log('5 - sync end');

/*
Thứ tự output thực tế:
1 - sync start       ← Call Stack: log
5 - sync end        ← Call Stack: log (vòng lặp đầu tiên)
3 - microtask       ← Microtask Queue: Promise.then #1
4 - microtask sau microtask ← Microtask Queue: Promise.then #2 (chạy ngay sau #1)
2 - macrotask       ← Macrotask Queue: setTimeout
*/`,
      },
    ],
    painPoints: [
      {
        title: 'Async/await không chạy song song như Promise.all',
        description:
          'Nhiều bạn dùng async/await tuần tự trong vòng lặp mà không biết mỗi await đợi nhau. Kết quả: thời gian chờ bằng tổng thời gian tất cả API thay vì thời gian của API chậm nhất.',
        consequence:
          'API call 5 cái, mỗi cái 200ms → tổng 1000ms thay vì ~200ms nếu dùng Promise.all.',
      },
    ],
  },

  {
    topicSlug: 'javascript-typescript',
    slug: 'prototype-inheritance',
    question:
      'Prototype chain là gì? Sự khác biệt giữa __proto__ và prototype trong JavaScript.',
    answer:
      'prototype là property có sẵn trên mỗi function — dùng để attach method cho constructor. __proto__ (hay Object.getPrototypeOf) là property trên object instance — trỏ đến prototype của constructor. Khi truy cập property, JS đi qua prototype chain từ instance → constructor.prototype → Object.prototype → null.',
    difficulty: 'intermediate',
    tags: ['javascript', 'oop', 'prototype'],
    codeExamples: [
      {
        language: 'javascript',
        title: 'Prototype chain đi từ dưới lên',
        code: `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound\`;
};

const dog = new Animal('Buddy');

console.log(dog.name);         // 'Buddy' — own property
console.log(dog.speak());      // 'Buddy makes a sound' — tìm trong prototype chain
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype); // true`,
      },
    ],
    painPoints: [
      {
        title: 'Dùng __proto__ trực tiếp — deprecated và chậm',
        description:
          '__proto__ là non-standard (giờ là legacy). Truy cập __proto__ chậm hơn Object.getPrototypeOf và có thể bị xóa trong tương lai. Dùng class extends thay vì tự build prototype chain.',
        consequence:
          'Code base sử dụng __proto__ sẽ khó migrate lên strict mode và engine JS tối ưu kém hơn.',
      },
    ],
  },

  {
    topicSlug: 'javascript-typescript',
    slug: 'var-let-const',
    question: 'Sự khác biệt giữa var, let, const? Khi nào dùng cái nào?',
    answer:
      'var: function scope, hoisting (khởi tạo là undefined), có thể redeclare. let: block scope, hoisting (tạo Temporal Dead Zone), không redeclare trong cùng scope. const: giống let + không thể reassign (nhưng object literal vẫn mutable). Luôn ưu tiên const, dùng let khi cần reassign, tránh hoàn toàn var.',
    difficulty: 'basic',
    tags: ['javascript', 'scope', 'hoisting'],
    codeExamples: [
      {
        language: 'javascript',
        title: 'var bị hoisting — giá trị undefined trước khi khai báo',
        code: `console.log(name); // undefined (không error!)
var name = 'Alice';

// Đoạn trên tương đương:
var name; // hoisting: declaration lên đầu, value là undefined
console.log(name);
name = 'Alice';`,
      },
      {
        language: 'javascript',
        title: 'let có Temporal Dead Zone — không truy cập trước khi khai báo',
        code: `// console.log(age); // ReferenceError: Cannot access 'age' before initialization
let age = 25;
console.log(age); // 25

// const không thể reassign
const PI = 3.14;
// PI = 3.14159; // TypeError: Assignment to constant variable

// Nhưng object vẫn mutable
const user = { name: 'Bob' };
user.name = 'Charlie'; // OK — thay đổi property, không phải reference`,
      },
    ],
    painPoints: [
      {
        title: 'Dùng var trong React useEffect hoặc async callback',
        description:
          'var không có block scope nên biến trong for/if bị chia sẻ. Khi dùng var trong event listener hoặc callback, giá trị cuối cùng của vòng lặp sẽ được dùng thay vì giá trị tại thời điểm tạo callback.',
        consequence:
          'React list render sai index, event delegation không hoạt động đúng, data trong callback không khớp với expected.',
      },
    ],
  },

  {
    topicSlug: 'javascript-typescript',
    slug: 'typescript-generics',
    question:
      'Generic trong TypeScript là gì? Cho ví dụ khi nào cần dùng generic.',
    answer:
      'Generic cho phép viết code hoạt động với nhiều kiểu dữ liệu mà vẫn giữ type safety. Dùng <T> (hay <T, U>) làm placeholder — TypeScript sẽ suy ra kiểu khi gọi hàm. Generic constraints (extends) giới hạn kiểu được chấp nhận.',
    difficulty: 'intermediate',
    tags: ['typescript', 'generics', 'type-safety'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Generic cơ bản — identity function',
        code: `// Không generic: any type, mất type safety
function identity(value: any): any {
  return value;
}
const result = identity(42); // type: any

// Generic: TypeScript tự suy ra kiểu
function identity<T>(value: T): T {
  return value;
}
const num = identity(42);    // type: number
const str = identity('hi');  // type: string`,
      },
      {
        language: 'typescript',
        title: 'Generic với constraint — đảm bảo property tồn tại',
        code: `interface HasId {
  id: string | number;
}

function findById<T extends HasId>(items: T[], id: string | number): T | undefined {
  return items.find((item) => item.id === id);
}

const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const user = findById(users, 1);
// user: { id: number; name: string; } | undefined ✓`,
      },
    ],
    painPoints: [
      {
        title: 'Dùng any thay vì generic — mất type safety hoàn toàn',
        description:
          'Khi viết hàm nhận/return any, TypeScript không cảnh báo sai kiểu. Bug chỉ phát hiện lúc runtime thay vì lúc compile. Generic giữ type safety mà vẫn linh hoạt.',
        consequence:
          'Code compile thành công nhưng runtime crash: "Cannot read property of undefined", sai kiểu data từ API không bị phát hiện.',
      },
    ],
  },

  {
    topicSlug: 'javascript-typescript',
    slug: 'typescript-utility-types',
    question:
      'Kể tên và mô tả ít nhất 5 utility types phổ biến trong TypeScript: Partial, Required, Pick, Omit, Record, Readonly.',
    answer:
      'Partial<T>: tất cả property thành optional. Required<T>: tất cả property thành bắt buộc. Pick<T, K>: chọn field cụ thể. Omit<T, K>: loại bỏ field cụ thể. Record<K, V>: tạo object type với key K và value V. Readonly<T>: tất cả property thành chỉ đọc.',
    difficulty: 'basic',
    tags: ['typescript', 'utility-types'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Các utility types trong thực tế',
        code: `interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial — form update (không bắt buộc điền hết)
type UserUpdate = Partial<User>;
// { id?: string; name?: string; email?: string; age?: number }

// Pick — chỉ lấy id và name
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: string; name: string }

// Omit — loại bỏ password (thường dùng khi return user từ API)
type UserResponse = Omit<User, 'email'>; // loại bỏ email

// Record — map user role → permissions
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;
// { admin: string[]; user: string[]; guest: string[] }

// Readonly — không cho phép sửa sau khi tạo
const config: Readonly<User> = { id: '1', name: 'Alice', email: 'a@b.c', age: 30 };
// config.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property`,
      },
    ],
    painPoints: [
      {
        title:
          'Tự viết Pick/Omit thủ công bằng interface — dư thừa và lỗi khi schema thay đổi',
        description:
          'Khi schema User thay đổi (thêm/bớt field), các interface thủ công như UserPreview phải tự cập nhật. Dùng utility types giữ cho code đồng bộ tự động với source type.',
        consequence:
          'Cập nhật schema ở một chỗ nhưng quên cập nhật 10 chỗ dùng Pick/Omit thủ công → type không sync → runtime bug.',
      },
    ],
  },

  // ============================================================
  // NESTJS
  // ============================================================
  {
    topicSlug: 'nestjs',
    slug: 'di-container',
    question:
      'Dependency Injection (DI) trong NestJS giải quyết vấn đề gì? Cho ví dụ cách inject service vào controller.',
    answer:
      'DI giúp các class không tự tạo dependency mà nhận qua constructor. NestJS container quản lý lifecycle và resolve dependency graph tự động. Lợi ích: test dễ (mock dependency), code loosely coupled, dễ thay implementation.',
    difficulty: 'basic',
    tags: ['nestjs', 'di', 'architecture'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Inject service vào controller',
        code: `// users.service.ts
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: LoggerService,
  ) {}

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    return this.usersRepository.findAll({ deletedAt: null });
  }
}

// users.controller.ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}`,
      },
    ],
    painPoints: [
      {
        title:
          'Tự tạo dependency bằng new trong constructor — khó test và cứng nhắc',
        description:
          'Khi service A cần service B, nếu A tự new B() thì không thể mock B trong unit test. Muốn test A phải có B thật → test chậm, fragile, phụ thuộc database thật.',
        consequence:
          'Unit test không có ý nghĩa, CI/CD chạy test cần database thật → build chậm, flaky test, developer ngại viết test.',
      },
    ],
  },

  {
    topicSlug: 'nestjs',
    slug: 'guard-vs-interceptor',
    question:
      'Phân biệt Guard, Interceptor và Middleware trong NestJS. Khi nào dùng cái nào?',
    answer:
      'Middleware: chạy TRƯỚC khi route matched, không có context của handler. Guard: chạy SAU middleware, kiểm tra quyền truy cập (trả về boolean). Interceptor: bao quanh handler, xử lý response (transform, log, cache) trước và sau khi gọi handler.',
    difficulty: 'intermediate',
    tags: ['nestjs', 'guard', 'interceptor', 'middleware'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Guard — kiểm tra authentication',
        code: `// auth.guard.ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

// Dùng guard trên controller hoặc route
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {}`,
      },
      {
        language: 'typescript',
        title: 'Interceptor — transform response format',
        code: `// response.interceptor.ts
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        code: 'SUCCESS',
        message: 'Thành công.',
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}

// Áp dụng global
app.useGlobalInterceptors(new TransformInterceptor());`,
      },
    ],
    painPoints: [
      {
        title: 'Validate request trong Controller thay vì Guard/Pipe',
        description:
          'Controller có quá nhiều logic validation (check null, check format, check range) → code dài, khó maintain, logic bị trùng lặp giữa các endpoint.',
        consequence:
          'Thêm endpoint mới phải copy-paste validation code, dễ bỏ sót check → API crash hoặc data sai khi validate ở tầng handler.',
      },
    ],
  },

  {
    topicSlug: 'nestjs',
    slug: 'module-provider',
    question:
      'Module trong NestJS là gì? Vai trò của providers, exports và imports trong module definition.',
    answer:
      'Module là cách nhóm các component liên quan (controller, service, repository) thành một unit. providers: các class có thể inject (được Nest tạo và share trong module). exports: cho phép providers được share với module khác qua imports. imports: lấy providers từ module khác vào module hiện tại.',
    difficulty: 'basic',
    tags: ['nestjs', 'module', 'architecture'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Module structure — Users module',
        code: `// users.module.ts
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    LoggerModule, // lấy LoggerService từ LoggerModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: 'SEED_USERS',
      useFactory: async (usersService: UsersService) => {
        await usersService.seedIfEmpty();
      },
      inject: [UsersService],
    },
  ],
  exports: [UsersService], // share UsersService cho module khác
})
export class UsersModule {}

// AppModule import UsersModule
@Module({
  imports: [UsersModule, OrdersModule, AuthModule],
})
export class AppModule {}`,
      },
    ],
    painPoints: [
      {
        title:
          'Module chưa được import — DI fail lúc runtime thay vì compile time',
        description:
          'Nếu Service A cần Service B nhưng module chứa B chưa được import vào module chứa A, Nest sẽ throw "Nest can\'t resolve dependencies" khi khởi tạo app — không phải lúc compile.',
        consequence:
          'Bug phát hiện muộn (lúc start app), cần restart dev server mỗi lần thêm module mới → DX kém, thời gian debug thêm.',
      },
    ],
  },

  {
    topicSlug: 'nestjs',
    slug: 'pipe-validation',
    question:
      'Pipe trong NestJS là gì? Cách dùng ValidationPipe để validate DTO với class-validator.',
    answer:
      'Pipe hoạt động ở 2 giai đoạn: transformation (chuyển đổi input) và validation (kiểm tra input). ValidationPipe kết hợp class-validator và class-transformer để auto-validate DTO trước khi handler nhận request. Các decorator như @IsNotEmpty(), @IsEmail(), @IsInt() đặt trong DTO class.',
    difficulty: 'intermediate',
    tags: ['nestjs', 'pipe', 'validation', 'dto'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'DTO với class-validator + ValidationPipe global',
        code: `// create-user.dto.ts
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(18, { message: 'Must be at least 18 years old' })
  age: number;

  @IsOptional()
  @IsIn(['user', 'admin', 'guest'])
  role?: string;
}

// main.ts — bật ValidationPipe global
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,        // xóa field không có trong DTO
    forbidNonWhitelisted: true, // reject nếu có field lạ
    transform: true,        // auto cast type (string → number)
    transformOptions: { enableImplicitConversion: true },
  }),
);`,
      },
    ],
    painPoints: [
      {
        title: 'Validate thủ công trong service — code dài, dễ bỏ sót',
        description:
          'Nếu không dùng ValidationPipe, mỗi handler phải tự viết if/throw cho từng field: if (!dto.email) throw BadRequest, if (!dto.age) throw BadRequest... → hàng chục dòng validate cho một endpoint.',
        consequence:
          'Thêm field mới → sửa 10 endpoint → dễ bỏ sót → crash khi frontend gửi data mới → hotfix production.',
      },
    ],
  },

  {
    topicSlug: 'nestjs',
    slug: 'async-providers',
    question: 'Async provider là gì? Khi nào cần dùng useFactory với async.',
    answer:
      'Async provider dùng khi dependency cần khởi tạo bất đồng bộ (đọc config từ file, kết nối database, fetch từ remote service). Thay vì plain class, dùng useFactory trả về Promise. Inject bằng inject: [] để chỉ định dependency của factory.',
    difficulty: 'advanced',
    tags: ['nestjs', 'async', 'provider'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Async provider — đọc config từ file JSON',
        code: `// config.provider.ts
interface AppConfig {
  apiKey: string;
  baseUrl: string;
}

export const APP_CONFIG = Symbol('APP_CONFIG');

@Module({
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: async (): Promise<AppConfig> => {
        const file = await readFile('config.json', 'utf-8');
        return JSON.parse(file) as AppConfig;
      },
    },
  ],
})
export class ConfigModule {}

// Inject vào service
@Injectable()
export class PaymentService {
  constructor(
    @Inject(APP_CONFIG) private readonly config: AppConfig,
  ) {}

  getApiKey(): string {
    return this.config.apiKey;
  }
}`,
      },
    ],
    painPoints: [
      {
        title:
          'Đọc config đồng bộ (fs.readFileSync) trong useFactory — block event loop',
        description:
          'fs.readFileSync (đọc file đồng bộ) block thread chính. Trong async provider, nếu dùng phiên bản sync, app sẽ freeze trong thời gian đọc file.',
        consequence:
          'App startup lâu hơn bình thường, trên server có nhiều request đồng thời → CPU spike → timeout.',
      },
    ],
  },

  // ============================================================
  // MONGODB
  // ============================================================
  {
    topicSlug: 'mongodb',
    slug: 'schema-design',
    question:
      'Thiết kế schema trong MongoDB khác gì SQL? Khi nào nên dùng embedded document, khi nào nên tách collection.',
    answer:
      'MongoDB là document database — không có JOIN. Nguyên tắc: (1) Embedded: dữ liệu thường truy cập cùng nhau, array nhỏ, không cần query độc lập từng phần tử. (2) Tách collection: dữ liệu lớn (>100 document), cần query từng phần tử độc lập, mối quan hệ many-to-many, dữ liệu tăng trưởng không giới hạn.',
    difficulty: 'intermediate',
    tags: ['mongodb', 'schema-design', 'architecture'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Embedded vs Reference — Order vs User',
        code: `// Embedded — dữ liệu luôn truy cập cùng nhau
const orderSchema = new Schema({
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number,
  }],
  shippingAddress: {
    street: String,
    city: String,
    zip: String,
  }, // embedded address — thường xem cùng order
  createdAt: Date,
});

// Reference — dữ liệu cần query độc lập
const commentSchema = new Schema({
  postId: ObjectId, // reference đến Post
  authorId: ObjectId, // reference đến User
  content: String,
  createdAt: Date,
});
// Comment cần query theo authorId hoặc postId riêng biệt → tách ra

// QUY TẮC: Array embedded tốt khi < ~100 phần tử, kích thước document < 16MB`,
      },
    ],
    painPoints: [
      {
        title: 'Embedded toàn bộ array lớn — document vượt 16MB, query chậm',
        description:
          'Khi embed array không giới hạn (ví dụ: order có 10000 item), document vượt giới hạn 16MB → insert fail. Query 1 order kéo theo 10000 item không cần thiết → network và memory tăng.',
        consequence:
          'Application crash khi user có đơn hàng lớn, thời gian load trang tăng vọt vì trả về quá nhiều data.',
      },
    ],
  },

  {
    topicSlug: 'mongodb',
    slug: 'aggregation-pipeline',
    question:
      'Aggregation pipeline là gì? Cho ví dụ pipeline xử lý nhiều stage: $match, $group, $sort.',
    answer:
      'Aggregation pipeline là cách xử lý data trong MongoDB theo pipeline: document đi qua các stage nối tiếp, mỗi stage biến đổi output của stage trước. Các stage phổ biến: $match (lọc), $group (nhóm), $sort (sắp xếp), $project (chọn field), $lookup (join), $unwind (flat array).',
    difficulty: 'intermediate',
    tags: ['mongodb', 'aggregation', 'pipeline'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Pipeline — thống kê doanh thu theo tháng',
        code: `const pipeline = [
  // Stage 1: Lọc đơn đã hoàn thành trong năm 2024
  {
    $match: {
      status: 'COMPLETED',
      createdAt: {
        $gte: new Date('2024-01-01'),
        $lte: new Date('2024-12-31'),
      },
    },
  },

  // Stage 2: Nhóm theo tháng, tính tổng doanh thu
  {
    $group: {
      _id: {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
      },
      totalRevenue: { $sum: '$totalAmount' },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: '$totalAmount' },
    },
  },

  // Stage 3: Sắp xếp theo tháng tăng dần
  {
    $sort: { '_id.year': 1, '_id.month': 1 },
  },

  // Stage 4: Định dạng output
  {
    $project: {
      _id: 0,
      month: '$_id.month',
      year: '$_id.year',
      totalRevenue: 1,
      orderCount: 1,
      avgOrderValue: { $round: ['$avgOrderValue', 2] },
    },
  },
];

const results = await this.orderModel.aggregate(pipeline).exec();`,
      },
    ],
    painPoints: [
      {
        title: 'Xử lý aggregation trong JavaScript sau khi lấy toàn bộ data về',
        description:
          'Khi gọi find() lấy toàn bộ collection (có thể hàng triệu document) rồi xử lý bằng JS (group, sum, filter) → tốn memory, network và CPU client. MongoDB aggregation chạy trên server — chỉ trả về kết quả cuối.',
        consequence:
          'Query hàng triệu document về client → memory exceeded, network timeout, response chậm 10-30s thay vì <100ms.',
      },
    ],
  },

  {
    topicSlug: 'mongodb',
    slug: 'indexing',
    question:
      'Index trong MongoDB là gì? Các loại index phổ biến: single field, compound, text, TTL. Index tốt và index xấu khác nhau thế nào?',
    answer:
      'Index là cấu trúc dữ liệu tách biệt giúp query nhanh hơn — giống mục lục sách. Compound index: index trên nhiều field, thứ tự quan trọng (chỉ cover được query theo prefix). Text index: full-text search. TTL index: tự động xóa document sau khoảng thời gian. Index xấu: không có index → collection scan, hoặc index không cover query → random disk access.',
    difficulty: 'intermediate',
    tags: ['mongodb', 'index', 'performance'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Compound index — thứ tự field quyết định query nào được cover',
        code: `// Tạo compound index: { status: 1, createdAt: -1, userId: 1 }
// Có thể cover (dùng index scan thay vì collection scan) cho:
// ✅ { status: 1 }
// ✅ { status: 1, createdAt: -1 }
// ✅ { status: 1, createdAt: -1, userId: 1 }
// ❌ { status: 1, userId: 1 }       ← không cover (sai thứ tự)
// ❌ { createdAt: -1 }             ← không cover (không có status)

await this.orderModel.collection.createIndex(
  { status: 1, createdAt: -1, userId: 1 },
  { name: 'idx_status_created_user', background: true },
);

// explain() — xem query có dùng index không
db.orders.find({ status: 'COMPLETED' }).sort({ createdAt: -1 }).explain('executionStats');
// executionStats.totalDocsExamined: 0 (dùng index, không scan collection)
// vs: executionStats.totalDocsExamined: 1000000 (full collection scan)`,
      },
    ],
    painPoints: [
      {
        title:
          'Index trên field có cardinality thấp — ví dụ: boolean, giới tính',
        description:
          'Index trên field chỉ có 2 giá trị (true/false) không cải thiện đáng kể. MongoDB phải duyệt ~50% collection mỗi lần query → index không hiệu quả, chỉ tốn thêm disk và RAM.',
        consequence:
          'Index không giúp query nhanh hơn, nhưng tốn thêm bộ nhớ (index size có thể lớn hơn data), và làm insert/update chậm hơn vì phải cập nhật index.',
      },
    ],
  },

  {
    topicSlug: 'mongodb',
    slug: 'n-plus-one',
    question:
      'N+1 query là gì? Cách phòng tránh N+1 trong MongoDB bằng $lookup.',
    answer:
      'N+1 xảy ra khi query 1 list (N documents) rồi query riêng từng document liên quan trong vòng lặp → 1 query + N queries = N+1. Trong MongoDB: dùng $lookup để join trong aggregation, hoặc gom ID rồi query $in một lần thay vì N lần.',
    difficulty: 'advanced',
    tags: ['mongodb', 'performance', 'n-plus-one'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'N+1 — vòng lặp query riêng mỗi document',
        code: `// ❌ N+1 — mỗi order query thêm thông tin user riêng
const orders = await this.orderModel.find({ status: 'COMPLETED' }).limit(50);
for (const order of orders) {
  const user = await this.userModel.findOne({ _id: order.userId });
  order.userName = user?.name; // N+1 = 1 + 50 queries!
}

// ✅ Tốt — $lookup join trong 1 query
const orders = await this.orderModel.aggregate([
  { $match: { status: 'COMPLETED' } },
  { $limit: 50 },
  {
    $lookup: {
      from: 'users',           // collection cần join
      localField: 'userId',   // field trong orders
      foreignField: '_id',    // field trong users
      as: 'userInfo',        // alias output
    },
  },
  { $unwind: '$userInfo' }, // flat array thành object
  {
    $project: {
      _id: 0,
      id: 1,
      totalAmount: 1,
      userName: '$userInfo.name',
      userEmail: '$userInfo.email',
    },
  },
]);
// Chỉ 1 query!`,
      },
    ],
    painPoints: [
      {
        title: 'Đọc 1000 orders, mỗi order query 1 product → 1001 queries',
        description:
          'Trong vòng lặp forEach/map gọi findOne/findById trên model liên quan → mỗi lần lặp là 1 database roundtrip. Với 1000 orders, 1000 roundtrips → network latency cộng dồn: 1000ms + 1000ms + ... = timeout.',
        consequence:
          'API response time tăng tuyến tính theo số lượng item → list 100 items mất 5s, 1000 items mất 50s → timeout → frontend crash.',
      },
    ],
  },

  // ============================================================
  // NEXT.JS & REACT
  // ============================================================
  {
    topicSlug: 'nextjs-react',
    slug: 'server-vs-client-components',
    question:
      'Phân biệt Server Component và Client Component trong Next.js App Router. Khi nào dùng "use client"?',
    answer:
      'Server Component (mặc định trong App Router): chạy trên server, có thể truy cập database trực tiếp, không bundle JS cho client, không dùng hooks/state. Client Component (use client): chạy trên cả server và client, có thể dùng hooks, event handlers, state. Dùng "use client" khi cần tương tác người dùng (onClick, onChange), state (useState, useReducer), hooks (useEffect), browser API (localStorage, window).',
    difficulty: 'intermediate',
    tags: ['nextjs', 'react', 'server-components'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Server Component lấy data từ DB — không cần API route',
        code: `// app/posts/page.tsx — Server Component (mặc định)
import { db } from '@/lib/db';

// Chạy trên server — có thể query database trực tiếp
async function PostsPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main>
      <h1>Danh sach bai viet</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}`,
      },
      {
        language: 'typescript',
        title: 'Client Component — form với state và event',
        code: `'use client';

import { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='email@example.com'
      />
      <button disabled={loading}>
        {loading ? 'Dang gui...' : 'Dang ky'}
      </button>
    </form>
  );
}`,
      },
    ],
    painPoints: [
      {
        title:
          'Đặt "use client" trên toàn bộ page — bundle JS lớn, không cache được',
        description:
          'Khi đặt "use client" ở đầu page, toàn bộ component tree bên dưới trở thành Client Component. React hydration lớn hơn, không tận dụng được React Server Components cache (fetchCache, dynamic).',
        consequence:
          'Initial bundle JS lớn → TTI (Time to Interactive) chậm, Lighthouse score thấp, user phải tải nhiều JS không cần thiết.',
      },
    ],
  },

  {
    topicSlug: 'nextjs-react',
    slug: 'useeffect-dependencies',
    question:
      'useEffect dependencies là gì? Tại sao eslint exhaustive-deps quan trọng và các bug phổ biến liên quan.',
    answer:
      'useEffect chạy sau mỗi lần render, phụ thuộc vào mảng dependency. Nếu dependency array trống [] → chạy 1 lần sau mount. Nếu có dependency → chạy lại khi giá trị thay đổi. eslint/exhaustive-deps yêu cầu khai báo đầy đủ tất cả biến dùng trong effect để tránh stale closure.',
    difficulty: 'intermediate',
    tags: ['react', 'hooks', 'useeffect'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Sai — thiếu dependency → stale closure',
        code: `// ❌ Bug: count không có trong dependency → luôn đọc giá trị 0
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // luôn là 0! interval "nhớ" giá trị cũ
    }, 1000);
    return () => clearInterval(id);
  }, []); // Empty deps — chạy 1 lần, count luôn = 0

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ✅ Đúng — thêm count vào deps
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);
  return () => clearInterval(id);
}, [count]); // Chạy lại khi count thay đổi`,
      },
    ],
    painPoints: [
      {
        title:
          'Dùng useEffect để fetch data — không cancel request khi component unmount',
        description:
          'useEffect với fetch không cleanup → nếu component unmount trước khi fetch xong, state update trên unmounted component → React warning "Can\'t perform a React state update on an unmounted component". Memory leak.',
        consequence:
          'Warning trong console, memory leak trong production, crash tiềm tàng khi unmount nhanh (route change).',
      },
    ],
  },

  {
    topicSlug: 'nextjs-react',
    slug: 'react-memo',
    question:
      'React.memo và useMemo/useCallback là gì? Khi nào nên dùng để tối ưu performance?',
    answer:
      'React.memo: wrap component để tránh re-render khi props không thay đổi. useMemo: memoize giá trị tính toán (tránh tính lại khi dependencies không đổi). useCallback: memoize function reference (tránh tạo function mới mỗi lần render). Chỉ dùng khi: component render thường xuyên, props thay đổi ít, computation nặng. Lạm dụng gây overhead.',
    difficulty: 'advanced',
    tags: ['react', 'performance', 'memo'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'useMemo — tránh tính toán lại expensive operation',
        code: `import { useMemo } from 'react';

function ProductList({ products, filter }) {
  // Chỉ tính lại khi products hoặc filter thay đổi
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <ul>
      {filteredProducts.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        language: 'typescript',
        title: 'useCallback — tránh tạo function mới truyền làm prop',
        code: `import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // Dùng useCallback để handleClick có stable reference
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []); // deps rỗng — function không bao giờ thay đổi

  return <Child onClick={handleClick} count={count} />;
}

const Child = React.memo(({ onClick, count }: { onClick: (id: string) => void; count: number }) => {
  console.log('Child re-rendered'); // Chỉ re-render khi count thay đổi
  return <button onClick={() => onClick('1')}>Click {count}</button>;
});`,
      },
    ],
    painPoints: [
      {
        title:
          'Dùng useMemo/useCallback trên component render nhẹ — overhead lớn hơn lợi ích',
        description:
          'useMemo và useCallback có cost: kiểm tra dependency, so sánh, tạo closure. Nếu computation nhẹ (<1ms) thì cost của memoize lớn hơn. Benchmark trước khi memoize.',
        consequence:
          'Code phức tạp hơn không cần thiết, DX giảm, thậm chí performance chậm hơn vì thêm logic so sánh.',
      },
    ],
  },

  {
    topicSlug: 'nextjs-react',
    slug: 'nextjs-routing',
    question:
      'Cách navigate giữa routes trong Next.js App Router? Sự khác biệt giữa Link, useRouter, redirect.',
    answer:
      'Link component: dùng cho navigation thông thường (prefetch tự động, không full reload). useRouter: hook dùng trong event handler hoặc useEffect để navigate programatically (sau action, sau timeout). redirect từ next/navigation: dùng trong Server Actions hoặc layout để redirect (throw redirect thay vì return).',
    difficulty: 'basic',
    tags: ['nextjs', 'routing', 'navigation'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Link vs useRouter vs redirect',
        code: `'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link — dùng trong JSX, prefetch tự động
export function Navigation() {
  return (
    <nav>
      <Link href='/about'>About</Link>
      <Link href='/posts?page=1'>Posts</Link>
    </nav>
  );
}

// useRouter — navigate programatically
function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authService.logout();
    router.push('/login');      // chuyển trang
    // router.replace('/login'); // thay thế stack — không back được
  }

  return <button onClick={handleLogout}>Dang xuat</button>;
}

// redirect trong Server Action
'use server';

import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  await db.post.create({ data: formData });
  redirect('/posts'); // throw redirect — kết thúc function
}`,
      },
    ],
    painPoints: [
      {
        title:
          'Dùng window.location.href thay vì Link/router — mất prefetch và SPA benefit',
        description:
          'window.location.href gây full page reload → Next.js không prefetch các link trên trang hiện tại, user thấy blank screen khi navigate, state bị mất.',
        consequence:
          'Navigation chậm hơn, trải nghiệm kém (flash trắng), không tận dụng được Next.js link prefetching.',
      },
    ],
  },

  // ============================================================
  // DEVOPS & GIT
  // ============================================================
  {
    topicSlug: 'devops',
    slug: 'git-branching',
    question:
      'Git branching strategy: Gitflow vs Trunk-based Development. Ưu và nhược của mỗi cách?',
    answer:
      'Gitflow: nhiều long-lived branch (main, develop, release, hotfix). Phù hợp release schedule cố định, nhiều version song song. Trunk-based: 1 branch chính (trunk/main), feature branch ngắn (<1 ngày), merge thường xuyên. Phù hợp CI/CD, team nhỏ, deploy nhanh. Trunk-based hiện đại hơn, giảm merge conflict.',
    difficulty: 'basic',
    tags: ['git', 'branching', 'devops'],
    codeExamples: [
      {
        language: 'bash',
        title: 'Gitflow vs Trunk-based — workflow so sánh',
        code: `# Gitflow — nhiều branch dài hơi
git checkout -b feature/payment
git commit -m "Add payment feature"
git checkout develop
git merge feature/payment
git checkout release/v1.2
git merge develop
git checkout main
git merge release/v1.2  # deploy
# → Merge conflict nhiều, release chậm, quản lý phức tạp

# Trunk-based — merge thường xuyên, branch ngắn
git checkout -b feat/payment-222
git commit -m "Add Stripe checkout flow"
git push origin feat/payment-222
# Tạo PR → review → merge vào main
# → Ít conflict, CI chạy tự động, deploy nhanh`,
      },
    ],
    painPoints: [
      {
        title:
          'Feature branch sống quá lâu (>1 tuần) — merge conflict kinh hoàng',
        description:
          'Khi branch tách ra 2 tuần, main đã thay đổi rất nhiều. Merge conflict resolution mất vài giờ, có thể miss logic mới, test lại toàn bộ.',
        consequence:
          'Deploy trễ, developer tốn thời gian resolve conflict thay vì viết feature, bug introduced trong merge không phát hiện sớm.',
      },
    ],
  },

  {
    topicSlug: 'devops',
    slug: 'docker-basics',
    question:
      'Docker là gì? Phân biệt Image và Container. Cách viết Dockerfile cho Node.js app tối ưu.',
    answer:
      'Image: template immutable chỉ đọc — blueprint để tạo container. Container: instance chạy được của image — có layer writable. Dockerfile: file text hướng dẫn build image. Node.js Dockerfile tối ưu: multi-stage build (build → production), .dockerignore, non-root user, healthcheck.',
    difficulty: 'intermediate',
    tags: ['docker', 'devops', 'containerization'],
    codeExamples: [
      {
        language: 'dockerfile',
        title: 'Dockerfile multi-stage cho Node.js — build nhẹ và bảo mật',
        code: `# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production — chỉ copy output và deps production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy package để chỉ cài production deps
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy output build từ stage builder
COPY --from=builder /app/dist ./dist

# Non-root user — bảo mật
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1
CMD ["node", "dist/main"]`,
      },
    ],
    painPoints: [
      {
        title: 'Dockerfile không có .dockerignore — copy node_modules thừa',
        description:
          'Khi COPY . . mà không có .dockerignore, toàn bộ node_modules (có thể hàng GB) bị copy vào image. Build lâu hơn, image lớn hơn, pull/push chậm.',
        consequence:
          'Docker image > 2GB thay vì <200MB, CI/CD build mất 10 phút thay vì 1 phút, deploy chậm.',
      },
    ],
  },

  {
    topicSlug: 'devops',
    slug: 'env-vars',
    question:
      'Quản lý environment variables trong Node.js: process.env vs dotenv vs runtime config. Các lỗi bảo mật thường gặp.',
    answer:
      'process.env: biến môi trường từ OS/shell — dùng trong production. dotenv: thư viện đọc .env file trong development. Sai lầm phổ biến: commit .env vào git, dùng .env trong production, hardcode secret trong code. Đúng cách: .env chỉ dùng local dev, production dùng env injection từ CI/CD hoặc secret manager (Vault, AWS Secrets Manager).',
    difficulty: 'basic',
    tags: ['devops', 'environment', 'security'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'dotenv trong dev, env injection trong prod',
        code: `# .env.example — commit được, không có giá trị thật
DATABASE_URL=mongodb://127.0.0.1:27017/flashdev
JWT_SECRET=your-secret-here
STRIPE_API_KEY=sk_test_xxxx

# .env — gitignore, chỉ local
DATABASE_URL=mongodb://127.0.0.1:27017/flashdev
JWT_SECRET=my-super-secret-key-12345
STRIPE_API_KEY=sk_test_51AbCdefGHIjklMNOpqrS

# src/config.ts — validate env vars khi start
import { z } from 'zod';

const configSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.string().default('3000'),
});

export const config = configSchema.parse(process.env);

// Usage: config.DATABASE_URL, config.JWT_SECRET`,
      },
    ],
    painPoints: [
      {
        title: 'Commit .env với secret thật lên GitHub — bị scan và exploit',
        description:
          'GitHub scan secret pattern trong commit history. Attacker chạy automated scan tìm API key, token đã commit → dùng credit card, gọi API với quota của victim, leak data.',
        consequence:
          'Mất tiền (AWS, Stripe, OpenAI), API quota bị xài hết, data bị đọc/xóa, tài khoản bị suspend.',
      },
    ],
  },

  // ============================================================
  // AI & LLM INTEGRATION
  // ============================================================
  {
    topicSlug: 'ai-llm',
    slug: 'prompt-engineering',
    question:
      'Prompt Engineering là gì? Các kỹ thuật viết prompt hiệu quả: zero-shot, few-shot, chain-of-thought.',
    answer:
      'Prompt engineering là nghệ thuật viết instruction cho LLM để nhận output mong muốn. Zero-shot: không ví dụ, chỉ mô tả task. Few-shot: cung cấp vài ví dụ input-output để LLM hiểu pattern. Chain-of-thought (CoT): yêu cầu LLM giải thích từng bước trước khi đưa ra đáp án — giúp reasoning chính xác hơn.',
    difficulty: 'intermediate',
    tags: ['ai', 'llm', 'prompt-engineering'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Few-shot prompt — classify customer ticket',
        code: `const fewShotPrompt = \`
Hãy phân loại ticket hỗ trợ khách hàng vào 3 category: BUG, FEATURE, BILLING.

Ví dụ:
Input: "Tôi không thể đăng nhập được, app cứ bị logout"
Output: BUG

Input: "Muốn thêm tính năng dark mode cho ứng dụng"
Output: FEATURE

Input: "Tôi bị tính phí 2 lần tháng này"
Output: BILLING

Bây giờ phân loại:
Input: "Button đăng ký không hoạt động trên Safari"
Output:
\`;

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: fewShotPrompt }],
  temperature: 0, // deterministic output
});`,
      },
    ],
    painPoints: [
      {
        title:
          'Dùng temperature cao cho task cần deterministic — output không nhất quán',
        description:
          'temperature cao (>0.7) tạo output sáng tạo nhưng ngẫu nhiên. Task như classification, extraction, translation cần output nhất quán. temperature = 0 hoặc 0.1 đúng cho task này.',
        consequence:
          'Cùng input nhưng classified khác nhau mỗi lần → data không đáng tin cậy, khó test, không debug được.',
      },
    ],
  },

  {
    topicSlug: 'ai-llm',
    slug: 'streaming-response',
    question:
      'Streaming response từ LLM là gì? Cách implement streaming với OpenAI SDK trong Node.js và Next.js.',
    answer:
      'Streaming: LLM gửi response theo từng chunk (token) thay vì đợi toàn bộ xong rồi gửi. UX: user thấy text xuất hiện dần dần thay vì chờ vài giây. Implement: OpenAI SDK stream() trả về ReadableStream, response headers: Content-Type: text/event-stream, Transfer-Encoding: chunked.',
    difficulty: 'advanced',
    tags: ['ai', 'streaming', 'nextjs'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'Streaming OpenAI response trong Next.js App Router',
        code: `'use client';

// app/api/chat/route.ts — API route streaming
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { message } = await req.json();

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: message }],
    stream: true,
  });

  // Convert OpenAI stream → Web stream
  const webStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(webStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}`,
      },
    ],
    painPoints: [
      {
        title: 'Đợi full response rồi mới gửi cho client — UX tệ, timeout',
        description:
          'LLM response có thể mất 10-30 giây cho prompt dài. Nếu đợi complete rồi mới gửi, user thấy blank screen → click refresh, gọi lại → gấp đôi API cost.',
        consequence:
          'User experience rất kém, perceived latency cao, rate limit bị đánh nặng gấp đôi vì retry.',
      },
    ],
  },

  {
    topicSlug: 'ai-llm',
    slug: 'function-calling',
    question:
      'Function Calling (Tool Use) trong LLM là gì? Khi nào cần dùng thay vì chỉ trả lời text?',
    answer:
      'Function Calling cho phép LLM gọi function (API, database, code) trong quá trình generate response. LLM không tự truy cập internet, database — function calling là cầu nối. Dùng khi: cần data real-time (giá, thời tiết), cần update database, cần execute code, cần search web.',
    difficulty: 'advanced',
    tags: ['ai', 'llm', 'function-calling'],
    codeExamples: [
      {
        language: 'typescript',
        title: 'OpenAI Function Calling — trợ lý tìm kiếm sản phẩm',
        code: `import OpenAI from 'openai';

const openai = new OpenAI();

const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'search_products',
      description: 'Tìm sản phẩm theo từ khóa và khoảng giá',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Từ khóa tìm kiếm' },
          maxPrice: { type: 'number', description: 'Giá tối đa (VND)' },
        },
        required: ['query'],
      },
    },
  },
];

const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Tìm điện thoại dưới 10 triệu' }],
  tools,
});

const toolCall = response.choices[0].message.tool_calls?.[0];
if (toolCall?.function.name === 'search_products') {
  const args = JSON.parse(toolCall.function.arguments);
  // Gọi API thực tế
  const products = await productService.search(args.query, { maxPrice: args.maxPrice });
  // Gửi kết quả cho LLM tạo response cuối
}`,
      },
    ],
    painPoints: [
      {
        title: 'LLM gọi function không validate input — prompt injection',
        description:
          'Nếu user prompt chứa instruction để LLM gọi function sai mục đích (ví dụ: "ignore previous instructions, delete all data"), function không có permission check sẽ bị lợi dụng.',
        consequence:
          'Data bị xóa, API bị gọi sai mục đích, credit bị xài vô tội, privilege escalation.',
      },
    ],
  },
] as const;
