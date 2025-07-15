<h1>Simple Login & Registration System</h1>

<p>A minimal <strong>Node.js + Express</strong> backend for user registration, login, and a protected route using JWT and cookies.</p>

<hr>

<h2>Features</h2>

<ul>
  <li> Register new users with <strong>name</strong>, <strong>unique email</strong>, and <strong>bcrypt hashed password</strong></li>
  <li> Login users with <strong>email</strong> and <strong>password</strong></li>
  <li>Generates <strong>JWT token</strong> and sends it in a <strong>secure HTTP-only cookie</strong></li>
  <li> Protected <code>/api/me</code> route to get logged-in user info</li>
  <li> MongoDB database with Mongoose</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>

<ul>
  <li><strong>Node.js + Express</strong></li>
  <li><strong>MongoDB + Mongoose</strong></li>
  <li><strong>bcrypt</strong> for password hashing</li>
  <li><strong>jsonwebtoken</strong> for auth tokens</li>
  <li><strong>dotenv</strong> for environment variables</li>
</ul>

<hr>

<h2>📌 API Endpoints</h2>

<h3>1️⃣ Register User</h3>
<p><strong>POST</strong> <code>/api/register</code></p>

<ul>
  <li><strong>Body:</strong> <code>{ name, email, password }</code></li>
  <li>Stores user with hashed password.</li>
  <li>Returns success or error if email exists.</li>
</ul>

<hr>

<h3>2️⃣ Login User</h3>
<p><strong>POST</strong> <code>/api/login</code></p>

<ul>
  <li><strong>Body:</strong> <code>{ email, password }</code></li>
  <li>Verifies email &amp; password.</li>
  <li>Returns JWT token in secure cookie on success.</li>
</ul>

<hr>

<h3>3️⃣ Get Logged-in User (Protected)</h3>
<p><strong>GET</strong> <code>/api/me</code></p>

<ul>
  <li>Requires valid JWT in <strong>Authorization header</strong> or cookie.</li>
  <li>Returns user info if token is valid.</li>
</ul>

<hr>

<h2>⚙️ Setup Instructions</h2>

<ol>
  <li><strong>Clone Repo</strong>
    <pre><code>git clone https://github.com/kobirul5/sm-technology-backend.git
cd YOUR-REPO
    </code></pre>
  </li>
  <li><strong>Install Dependencies</strong>
    <pre><code>npm install
    </code></pre>
  </li>
  <li><strong>Create <code>.env</code> File</strong>
    <pre><code>PORT=5000
MONGODB_URI=mongodb://localhost:27017/loginDB
JWT_SECRET=your_jwt_secret_key
    </code></pre>
  </li>
  <li><strong>Start Development Server</strong>
    <pre><code>npm run dev
    </code></pre>
    <p>Server will run at <a href="http://localhost:5000">http://localhost:5000</a></p>
  </li>
</ol>
